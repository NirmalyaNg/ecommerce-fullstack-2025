'use client';
import Header from '@/components/Header';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className='container'>
        <ToastContainer />
        <div className='row'>
          <div className='col-12'>{children}</div>
        </div>
      </div>
    </>
  );
}
