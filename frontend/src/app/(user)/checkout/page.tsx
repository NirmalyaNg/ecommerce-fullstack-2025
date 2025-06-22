// app/(user)/checkout/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CheckoutItemsWrapper from '@/components/checkout/CheckoutItemsWrapper';

const CheckoutPage = async () => {
  // Get token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return redirect('/login');
  }

  // Call existing `getCurrentUser()` using fetch (server side)
  const response = await fetch('http://localhost:8000/api/auth/me', {
    method: 'GET',
    headers: {
      Cookie: `token=${token}`,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  const data = await response.json();

  if (!data?.success || !data?.data?.user) {
    return redirect('/login');
  }

  const user = data.data.user;

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>Checkout</h1>
      <p>
        Welcome, <strong>{user.firstName}</strong>. Please complete your order below.
      </p>
      <div className='row mt-4'>
        <CheckoutItemsWrapper />
      </div>
    </div>
  );
};

export default CheckoutPage;
