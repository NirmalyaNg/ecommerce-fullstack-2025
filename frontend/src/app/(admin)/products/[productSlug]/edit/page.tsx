import EditProductForm from '@/components/admin/EditProductForm';
import { getProductBySlug } from '@/api/admin/products';
import { getAllCategories } from '@/api/admin/categories';

type Props = {
  params: Promise<{
    productSlug: string;
  }>;
};

const EditProductPage = async ({ params }: Props) => {
  const res = await getProductBySlug((await params).productSlug);
  const resCategories = await getAllCategories();
  const product = res.success && res.data?.product;

  if (!product || !resCategories?.success || !resCategories?.data?.categories) {
    return (
      <div className='container mt-5'>
        <h2 className='text-danger'>Product not found</h2>
      </div>
    );
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-sm-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3'>
          <EditProductForm product={product} categories={resCategories.data?.categories} />
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
