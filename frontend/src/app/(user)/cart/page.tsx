// app/(user)/cart/page.tsx
import CartItems from '@/components/cart/CartItems';
import CartSummary from '@/components/cart/CartSummary';

const CartPage = () => {
  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>Your Cart</h1>
      <div className='row'>
        <div className='col-lg-8'>
          <CartItems />
        </div>
        <div className='col-lg-4'>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
