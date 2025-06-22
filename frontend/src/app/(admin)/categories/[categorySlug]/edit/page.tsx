import EditCategoryForm from '@/components/admin/EditCategoryForm';
import { getAllCategories } from '@/api/admin/categories';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ categorySlug: string }>;
};

const EditCategoryPage = async ({ params }: Props) => {
  const { categorySlug } = await params;

  const res = await getAllCategories(); // Assuming you only have slug-based get from all
  const category = res.data?.categories?.find((cat) => cat.slug === categorySlug);

  if (!category) return notFound();

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-sm-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3'>
          <EditCategoryForm category={category} />
        </div>
      </div>
    </div>
  );
};

export default EditCategoryPage;
