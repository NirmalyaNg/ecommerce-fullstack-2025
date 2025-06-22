'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAllCategories } from '@/api/admin/categories';
import { Category } from '@/models/category';
import { addProduct } from '@/api/admin/products';

type ProductFormData = {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  inStock: boolean;
};

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>();

  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res.success && res.data?.categories) {
        setCategories(res.data.categories);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: ProductFormData) => {
    const res = await addProduct(data);
    if (res.success) {
      alert('Product added successfully!');
      reset();
      router.push('/products');
      router.refresh();
    } else {
      alert(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='card p-4 border-0 shadow-sm'>
      <div className='card-body'>
        <h2 className='mb-4 text-center'>Add New Product</h2>

        <div className='mb-3'>
          <label className='form-label'>Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
          {errors.title && <div className='invalid-feedback'>{errors.title.message}</div>}
        </div>

        <div className='mb-3'>
          <label className='form-label'>Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          />
          {errors.description && (
            <div className='invalid-feedback'>{errors.description.message}</div>
          )}
        </div>

        <div className='mb-3'>
          <label className='form-label'>Price (₹)</label>
          <input
            type='number'
            step='0.01'
            {...register('price', {
              required: 'Price is required',
              valueAsNumber: true,
              min: 1,
            })}
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
          />
          {errors.price && <div className='invalid-feedback'>{errors.price.message}</div>}
        </div>

        <div className='mb-3'>
          <label className='form-label'>Image URL</label>
          <input
            {...register('image', { required: 'Image is required' })}
            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
          />
          {errors.image && <div className='invalid-feedback'>{errors.image.message}</div>}
        </div>

        <div className='mb-3'>
          <label className='form-label'>Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className={`form-select ${errors.category ? 'is-invalid' : ''}`}>
            <option value=''>Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <div className='invalid-feedback'>{errors.category.message}</div>
          )}
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

        <div className='form-check mb-3'>
          <input
            type='checkbox'
            className='form-check-input'
            {...register('inStock')}
            defaultChecked
          />
          <label className='form-check-label'>In Stock</label>
        </div>

        <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
