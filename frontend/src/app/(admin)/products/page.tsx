import { fetchProducts } from '@/api/products';
import { DeleteProductButton } from '@/components/admin/DeleteProductButton';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type SearchParams = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

const AdminProductsPage = async ({ searchParams }: SearchParams) => {
  const page = parseInt((await searchParams)?.page ?? '1');
  const response = await fetchProducts('', page);

  if (!response.success) {
    redirect('/error');
  }

  const { products, page: currentPage, pages: totalPages } = response.data!;

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1 className='mb-0'>Products</h1>
        <Link href='/products/add' className='btn btn-primary'>
          ➕ Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className='text-muted'>No products found.</p>
      ) : (
        <>
          <div className='table-responsive'>
            <table className='table table-bordered table-hover align-middle'>
              <thead className='table-dark'>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td style={{ width: '100px' }}>
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={80}
                        height={80}
                        className='img-thumbnail'
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.category?.name ?? '-'}</td>
                    <td>₹{product.price}</td>
                    <td>
                      {product.inStock ? (
                        <span className='badge bg-success'>In Stock</span>
                      ) : (
                        <span className='badge bg-danger'>Out of Stock</span>
                      )}
                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <Link
                          href={`/products/${product.slug}/edit`}
                          className='btn btn-sm btn-outline-primary'>
                          ✏️ Edit
                        </Link>
                        <DeleteProductButton id={product?._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className='mt-4'>
              <ul className='pagination justify-content-center'>
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <li
                      key={pageNum}
                      className={`page-item ${pageNum === currentPage ? 'active' : ''}`}>
                      <Link className='page-link' href={`/products?page=${pageNum}`}>
                        {pageNum}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProductsPage;
