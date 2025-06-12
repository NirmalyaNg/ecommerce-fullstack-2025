'use client';
import { getCurrentUser } from '@/api/auth';
import { User } from '@/models/user';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  handleSetUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleSetUser: () => {},
  loading: true,
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSetUser = (user: User | null) => {
    setUser(user);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getCurrentUser();
        if (!res?.data?.user) {
          throw new Error();
        }
        setUser(res?.data?.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSetUser,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
