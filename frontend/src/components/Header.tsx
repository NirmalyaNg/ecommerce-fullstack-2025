'use client';
import { logoutUser } from '@/api/auth';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const Header = () => {
  const pathname = usePathname();
  const { user, loading, handleSetUser } = useContext(AuthContext);
  const isAuthenticated = !!user;

  const handleLogout = async () => {
    const res = await logoutUser();
    if (!res?.success) {
      return toast('Logout Failed', {
        theme: 'light',
        type: 'error',
      });
    }
    if (res?.success) {
      handleSetUser(null);
    }
  };
  return (
    <nav className='navbar navbar-expand-md bg-dark navbar-dark sticky-top'>
      <div className='container-fluid'>
        <Link className='navbar-brand' href='/'>
          Proshop
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ${
                  pathname.endsWith('cart') && pathname !== '' ? 'active' : ''
                }`}
                href='/cart'>
                Cart
              </Link>
            </li>
            <li className='nav-item'>
              {!isAuthenticated && !loading && (
                <Link
                  className={`nav-link ${
                    pathname.endsWith('login') && pathname !== '' ? 'active' : ''
                  }`}
                  href='/login'>
                  Login
                </Link>
              )}
            </li>
            <li>
              {isAuthenticated && !loading && (
                <button className='nav-link' onClick={handleLogout}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
