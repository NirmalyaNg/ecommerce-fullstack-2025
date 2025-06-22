'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { addCategory } from '@/api/admin/categories';

type CategoryFormData = {
  name: string;
  slug: string;
  description?: string;
};

const AddCategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryFormData>();

  const router = useRouter();

  const onSubmit = async (data: CategoryFormData) => {
    const res = await addCategory(data);
    if (res.success) {
      alert('Category added successfully!');
      reset();
      router.push('/categories');
      router.refresh();
    } else {
      alert(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='card p-4 border-0 shadow-sm'>
      <div className='card-body'>
        <h2 className='mb-4 text-center'>Add New Category</h2>

        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className='invalid-feedback'>{errors.name.message}</div>}
        </div>

        <div className='mb-3'>
          <label className='form-label'>Slug</label>
          <input
            {...register('slug', {
              required: 'Slug is required',
              pattern: {
                value: /^[a-z0-9-]+$/,
                message: 'Slug must be lowercase alphanumeric with hyphens only',
              },
            })}
            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
          />
          {errors.slug && <div className='invalid-feedback'>{errors.slug.message}</div>}
        </div>

        <div className='mb-3'>
          <label className='form-label'>Description (optional)</label>
          <textarea {...register('description')} className='form-control' rows={3} />
        </div>

        <button type='submit' className='btn btn-primary w-100' disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Category'}
        </button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
