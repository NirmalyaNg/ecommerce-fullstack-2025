'use client';

import { deleteCategory } from '@/api/admin/categories';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
};

export const DeleteCategoryButton = ({ id }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    const res = await deleteCategory(id);
    if (res.success) {
      alert('Category deleted');
      router.refresh();
    } else {
      alert(res.error || 'Failed to delete');
    }
  };

  return (
    <button onClick={handleDelete} className='btn btn-sm btn-outline-danger'>
      Delete
    </button>
  );
};
