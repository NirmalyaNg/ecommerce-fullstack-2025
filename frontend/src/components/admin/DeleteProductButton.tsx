'use client';

import { deleteProduct } from '@/api/admin/products';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
};

export const DeleteProductButton = ({ id }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const res = await deleteProduct(id);
    if (res.success) {
      alert('Product deleted');
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
