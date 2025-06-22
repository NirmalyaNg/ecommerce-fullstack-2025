'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const CartSummary = ({ showCheckout = true }: { showCheckout?: boolean }) => {
  const { cart: cartItems } = useCart();
  const router = useRouter();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const grandTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  if (!cartItems.length) return null;

  return (
    <div className='card p-4 shadow-sm'>
      <h4 className='mb-3'>Order Summary</h4>
      <div className='d-flex justify-content-between mb-2'>
        <span>Total Items:</span>
        <span>{totalItems}</span>
      </div>
      <div className='d-flex justify-content-between mb-2'>
        <span>Subtotal:</span>
        <span>₹{grandTotal}</span>
      </div>
      <hr />
      <div className='d-flex justify-content-between fw-bold mb-3'>
        <span>Grand Total:</span>
        <span>₹{grandTotal}</span>
      </div>
      {showCheckout && (
        <button className='btn btn-primary w-100' onClick={() => router.push('/checkout')}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartSummary;
