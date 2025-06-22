'use strict';

import AuthContextProvider from '@/context/AuthContext';
import { ReactNode } from 'react';

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
export default AuthWrapper;
