'use strict';

import { CartProvider } from '@/context/CartContext';
import { ReactNode } from 'react';

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};
export default AuthWrapper;
