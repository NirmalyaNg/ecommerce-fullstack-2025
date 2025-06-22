import Product from '../models/product.js';

// Add product
export const handleProductAdd = async (req, res) => {
  try {
    const { title, description, price, image, category, slug, inStock } = req.body ?? {};

    // Required fields check
    if (!title || !description || !price || !image || !category || !slug) {
      return res.status(400).json({
        success: false,
        error:
          'Missing required fields. Required: title, description, price, image, category, slug.',
      });
    }

    // Price must be a number
    if (isNaN(price)) {
      return res.status(400).json({
        success: false,
        error: 'Price must be a valid number.',
      });
    }

    // Optional: slug format check
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({
        success: false,
        error: 'Slug must be lowercase, alphanumeric, and may include hyphens.',
      });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      inStock: inStock !== undefined ? inStock : true,
      image,
      category,
      slug,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: { product: newProduct },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message ?? 'Failed to add product',
    });
  }
};

// Delete Product by ID
export const handleProductDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message ?? 'Failed to delete product',
    });
  }
};

// Get Product by ID
export const handleGetProductById = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug }).populate('category');

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { product },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message ?? 'Invalid product slug',
    });
  }
};

// Get All Products (with pagination + search)
export const handleGetAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = process.env.PRODUCTS_PER_PAGE ?? 10, search = '' } = req.query;

    const query = {
      title: { $regex: search, $options: 'i' },
    };

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate('category')
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: { products, total, page: Number(page), pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message ?? 'Failed to fetch products',
    });
  }
};

// Update Product by ID
export const handleProductUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { product: updatedProduct },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message ?? 'Failed to update product',
    });
  }
};
