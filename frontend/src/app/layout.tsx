'use client';
import { ReactNode } from 'react';
import './globals.css';
import AuthContextProvider from '@/context/AuthContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
