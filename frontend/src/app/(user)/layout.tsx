import Header from '@/components/Header';
import ToastWrapper from '@/components/ToastWrapper';
import { ReactNode } from 'react';

export default function UserLayout({ children }: { children: ReactNode }) {
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
