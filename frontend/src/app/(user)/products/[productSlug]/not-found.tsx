import Link from 'next/link';

const ProductNotFound = () => {
  return (
    <div className='container text-center py-5'>
      <div className='mb-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='80'
          height='80'
          fill='currentColor'
          className='bi bi-exclamation-triangle text-warning'
          viewBox='0 0 16 16'>
          <path d='M7.938 2.016a.13.13 0 0 1 .125 0l6.857 11.856c.06.104.058.23-.006.332a.266.266 0 0 1-.22.112H1.306a.266.266 0 0 1-.22-.112.267.267 0 0 1-.006-.332L7.937 2.016zM8 4.93c-.535 0-.954.462-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507a.905.905 0 0 0-.9-.995zm.002 6.5a.998.998 0 1 0 0 2 .998.998 0 0 0 0-2z' />
        </svg>
      </div>

      <h1 className='display-5 fw-bold'>Product Not Found</h1>
      <p className='lead text-muted'>
        Sorry, the product you are looking for does not exist or is no longer available.
      </p>

      <div className='mt-4'>
        <Link href='/' className='btn btn-primary me-2'>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ProductNotFound;
