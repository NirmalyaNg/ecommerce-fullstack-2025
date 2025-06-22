import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import ToastWrapper from '@/components/ToastWrapper';
import { cookies } from 'next/headers';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const res = await fetch('http://localhost:8000/api/auth/me', {
    method: 'GET',
    headers: {
      Cookie: cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join('; '),
    },
    credentials: 'include',
    cache: 'no-store',
  });

  const data = await res.json();

  if (!data.success || !data.data?.user?.isAdmin) {
    redirect('/');
  }

  return (
    <>
      <Header />
      <div className='container'>
        <ToastWrapper />
        <div className='row'>
          <div className='col-12'>{children}</div>
        </div>
      </div>
    </>
  );
}
