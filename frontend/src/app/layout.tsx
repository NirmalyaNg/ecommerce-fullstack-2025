import { ReactNode } from 'react';
import './globals.css';
import AuthWrapper from '@/components/auth/AuthWrapper';
import CartWrapper from '@/components/cart/CartWrapper';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AuthWrapper>
          <CartWrapper>{children}</CartWrapper>
        </AuthWrapper>
      </body>
    </html>
  );
}
