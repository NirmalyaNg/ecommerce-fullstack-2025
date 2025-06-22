'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  productId: string;
  title: string;
  price: number;
  image: string;
  slug: string;
  inStock: boolean;
};

const AddToCartButton = ({ productId, title, price, image, slug, inStock }: Props) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    if (!inStock) return toast.error('Product is out of stock');
    setLoading(true);
    addToCart({ productId, title, price, image, slug, quantity: 1, inStock });
    toast.success('Added to cart');
    setLoading(false);
  };

  return (
    <button className='btn btn-dark mt-3' onClick={handleAdd} disabled={loading || !inStock}>
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
