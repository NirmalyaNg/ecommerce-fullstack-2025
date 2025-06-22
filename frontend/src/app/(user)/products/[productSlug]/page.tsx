import { fetchProductById } from '@/api/products';
import { Product } from '@/models/product';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/cart/AddToCartButton';

type Params = {
  params: Promise<{
    productSlug: string;
  }>;
};

const ProductDetailPage = async ({ params }: Params) => {
  const { productSlug } = await params;
  const response = await fetchProductById(productSlug);
  const product: Product | undefined = response.success
    ? response.data?.products?.[0]
    : undefined;

  if (!product) return notFound();

  return (
    <div className='container mt-5'>
      <div className='row align-items-start'>
        {/* Product Image */}
        <div className='col-md-6'>
          <div className='position-relative rounded' style={{ height: '450px' }}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              className='rounded object-fit-contain'
              style={{ objectFit: 'contain' }}
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
        </div>

        {/* Product Details */}
        <div className='col-md-6'>
          <h1 className='mb-3'>{product.title}</h1>
          <p className='text-muted'>{product.description}</p>
          <p className='text-muted'>({product.category?.name})</p>
          <h4 className='text-primary mt-4'>₹{product.price}</h4>

          <div className='mt-4'>
            {product.inStock ? (
              <span className='badge bg-success'>In Stock</span>
            ) : (
              <span className='badge bg-danger'>Out of Stock</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <AddToCartButton
            productId={product._id}
            title={product.title}
            price={product.price}
            image={product.image}
            slug={product.slug}
            inStock={product.inStock}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
