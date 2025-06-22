'use client';

import { loginUser } from '@/api/auth';
import { AuthContext } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const { handleSetUser } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = async (values: LoginFormValues) => {
    const { email, password } = values;
    const res = await loginUser(email, password);
    if (!res?.success) {
      toast(res?.error, {
        type: 'error',
        theme: 'light',
      });
      return;
    }
    if (!!res?.data?.user) {
      handleSetUser(res?.data?.user);
    }
    router.push(redirect ? `/${redirect}` : '/');
  };
  return (
    <div className='row mt-5'>
      <div className='col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-md-3'>
        <div className='card border-0 p-3 shadow-sm'>
          <div className='card-body'>
            <h1 className='text-center'>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-group mb-2'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Email is invalid',
                    },
                  })}
                />
                {errors?.email?.message && (
                  <span className='text-danger'>{errors?.email?.message}</span>
                )}
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {errors?.password?.message && (
                  <span className='text-danger'>{errors?.password?.message}</span>
                )}
              </div>
              <button className='btn btn-primary' type='submit' disabled={isSubmitting}>
                Login
              </button>
              <button
                className='btn btn-warning ms-2'
                type='button'
                onClick={() => router.push('/register')}>
                Go to Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
