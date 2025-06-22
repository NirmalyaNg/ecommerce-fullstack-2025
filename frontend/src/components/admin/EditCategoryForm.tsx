'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { updateCategory } from '@/api/admin/categories';
import { Category } from '@/models/category';

type Props = {
  category: Category;
};

const EditCategoryForm = ({ category }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Category>({
    defaultValues: category,
  });

  const onSubmit = async (formData: Category) => {
    const res = await updateCategory(category._id, formData);
    if (res.success) {
      alert('Category updated successfully!');
      router.push('/categories');
      router.refresh();
    } else {
      alert(res.error);
    }
  };

  useEffect(() => {
    reset(category); // ensure form stays synced with initial data
  }, [category, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='card p-4 border-0 shadow-sm'>
      <div className='card-body'>
        <h2 className='mb-4 text-center'>Edit Category</h2>

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
          <label className='form-label'>Description</label>
          <textarea {...register('description')} className='form-control' rows={3} />
        </div>

        <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Category'}
        </button>
      </div>
    </form>
  );
};

export default EditCategoryForm;
