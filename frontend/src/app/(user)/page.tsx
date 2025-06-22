import { fetchProducts } from '@/api/products';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import { Product } from '@/models/product';
import Image from 'next/image';
import Link from 'next/link';

const Home = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const currentPage = parseInt((await searchParams).page ?? '1', 10);
  const response = await fetchProducts('', currentPage, 6);
  const products = response.success ? response.data?.products ?? [] : [];
  const totalPages = response.data?.pages ?? 1;

  if (products?.length === 0) {
    return (
      <div className='container'>
        <h1 className='mb-4'>No Products Found</h1>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <h1 className='mb-4'>Our Products</h1>
      <div className='row'>
        {products.map((product: Product) => (
          <div key={product._id} className='col-lg-4 d-flex align-items-stretch mb-4'>
            <div className='card p-4 d-flex flex-column border-0'>
              <div className='position-relative' style={{ height: '280px' }}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className='card-img-top rounded-top'
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className='card-body d-flex flex-column'>
                <h5 className='card-title'>{product.title}</h5>
                <p className='card-text text-truncate'>{product.description}</p>
                <p className='card-text fw-bold mt-auto'>₹{product.price}</p>
                <Link href={`/products/${product.slug}`}>
                  <Button label='View Details' />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default Home;
