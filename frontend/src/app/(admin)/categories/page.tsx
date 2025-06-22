import { getAllCategories } from '@/api/admin/categories';
import { DeleteCategoryButton } from '@/components/admin/DeleteCategoryButton';
import Link from 'next/link';

const CategoriesPage = async () => {
  const res = await getAllCategories();

  const categories = res.success && res.data?.categories ? res.data.categories : [];

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>All Categories</h1>
      <div className='my-2'>
        <Link href='/categories/add' className='btn btn-primary'>
          ➕ Add New Category
        </Link>
      </div>

      {categories.length === 0 ? (
        <p className='text-muted'>No categories found.</p>
      ) : (
        <div className='table-responsive'>
          <table className='table table-bordered table-hover align-middle'>
            <thead className='table-dark'>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat.name}</td>
                  <td>{cat.slug}</td>
                  <td>{cat.description || '-'}</td>
                  <td>
                    <div className='d-flex gap-2'>
                      <DeleteCategoryButton id={cat?._id} />
                      <Link href={`/categories/${cat.slug}/edit`}>
                        <button className='btn btn-warning btn-sm ms-2'>Edit</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
