import Category from '../models/category.js';
import Product from '../models/product.js';

// Add Category
export const handleCategoryAdd = async (req, res) => {
  try {
    const { name, description, slug } = req?.body ?? {};
    const newCategory = new Category({
      name,
      slug,
      description,
    });
    await newCategory.save();
    res.status(201).json({
      success: true,
      data: {
        category: newCategory,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message ?? 'Invalid category data',
    });
  }
};

// Update category
export const handleCategoryUpdate = async (req, res) => {
  try {
    const { name, description, slug } = req?.body ?? {};
    const { id } = req?.params;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
        slug,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }

    res.json({
      success: true,
      data: {
        category: updatedCategory,
      },
    });
  } catch (error) {}
};

// Delete Category
export const handleCategoryDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }

    // Delete associated products for the category as well
    await Product.deleteMany({
      category: deletedCategory._id,
    });

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message ?? 'Failed to delete category',
    });
  }
};

// Fetch All Categories
export const handleGetAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      data: { categories },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message ?? 'Failed to fetch categories',
    });
  }
};

// Fetch Category by id
export const handleGetCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { category },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message ?? 'Invalid category ID',
    });
  }
};
