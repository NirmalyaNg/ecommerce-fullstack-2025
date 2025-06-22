'use client';
import { useCart } from '@/context/CartContext';
import CheckoutForm from './CheckoutForm';
import { PlaceOrderButton } from './PlaceOrderButton';
import CartSummary from '../cart/CartSummary';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { createOrder } from '@/api/order';
import { AuthContext } from '@/context/AuthContext';

const CheckoutItemsWrapper = () => {
  const { cart: cartItems, refreshCart } = useCart();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'cod',
  });

  const totalAmount = cartItems?.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

  const onPlaceOrder = async () => {
    if (!formData.address || !formData.city || !formData.postalCode || !formData.country) {
      toast.error('Please fill all address fields');
      return;
    }

    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          product: item.productId,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: `${user?.firstName} ${user?.lastName}`,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          email: user?.email,
          phone: formData.phone,
        },
        paymentMethod:
          formData.paymentMethod === 'cod'
            ? 'Cash on Delivery'
            : formData.paymentMethod === 'card'
            ? 'Card'
            : 'UPI',
        totalAmount: totalAmount!,
      };
      const response = await createOrder(orderPayload);
      if (response.success) {
        toast.success('Order placed successfully!');
        localStorage.removeItem('local_cart');
        refreshCart();
        router.push('/orders');
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error((error as Error)?.message ?? 'Failed to place order');
    }
  };

  return (
    <>
      <div className='col-md-7'>
        <CheckoutForm formData={formData} setFormData={setFormData} />
      </div>

      {/* Right: Order Summary */}
      <div className='col-md-5'>
        <CartSummary showCheckout={false} />
        <PlaceOrderButton onPlaceOrder={onPlaceOrder} />
      </div>
    </>
  );
};
export default CheckoutItemsWrapper;
