'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

const CartItems = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (!cart.length) {
    return <p className='text-muted'>🛒 Your cart is currently empty.</p>;
  }

  return (
    <>
      {cart.map((item) => (
        <div key={item.productId} className='card mb-3 border-0 shadow-sm'>
          <div className='row g-0 align-items-center'>
            {/* Image */}
            <div className='col-md-3'>
              <div className='position-relative rounded-start' style={{ height: '150px' }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='rounded-start object-fit-contain'
                />
              </div>
            </div>

            {/* Product Info */}
            <div className='col-md-6'>
              <div className='card-body'>
                <h5 className='card-title mb-1'>
                  <Link
                    href={`/products/${item.slug}`}
                    className='text-decoration-none text-dark'>
                    {item.title}
                  </Link>
                </h5>
                <p className='fw-semibold mb-2'>₹{item.price}</p>

                {/* Quantity Controls */}
                <div className='d-flex align-items-center'>
                  <Button
                    size='sm'
                    variant='outline-secondary'
                    onClick={() =>
                      item.quantity > 1
                        ? updateQuantity(item.productId, item.quantity - 1)
                        : removeFromCart(item.productId)
                    }>
                    −
                  </Button>
                  <span className='mx-3'>{item.quantity}</span>
                  <Button
                    size='sm'
                    variant='outline-secondary'
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                    +
                  </Button>
                </div>

                {/* Remove Option */}
                <Button
                  variant='link'
                  className='mt-2 p-0 text-danger text-decoration-none'
                  onClick={() => removeFromCart(item.productId)}>
                  Remove
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className='col-md-3 text-end pe-4'>
              <p className='mb-0 fw-bold'>₹{item.price * item.quantity}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItems;
