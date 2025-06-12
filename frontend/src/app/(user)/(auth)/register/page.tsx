'use client';
import { registerUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: 'Male' | 'Female' | 'Other';
};

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (values: RegisterFormValues) => {
    const data = await registerUser(values);
    if (!!data?.success) {
      toast('Registration Successfull', {
        theme: 'light',
        type: 'success',
      });
      router.push('/login');
    }
  };

  const GENDER = ['Male', 'Female', 'Other'];
  return (
    <div className='row mt-5'>
      <div className='col-sm-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3'>
        <div className='card p-4 border-0 shadow-sm'>
          <div className='card-body'>
            <h2 className='text-center'>Registration Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-group mb-2'>
                <label htmlFor='firstName'>First Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='firstName'
                  {...register('firstName', {
                    required: 'First Name is required',
                    minLength: {
                      value: 2,
                      message: 'First Name should have atleast 2 characters',
                    },
                  })}
                />
                {errors.firstName && (
                  <span className='text-danger'>{errors.firstName.message}</span>
                )}
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='firstName'>Last Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='lastName'
                  {...register('lastName', {
                    required: 'Last Name is required',
                    minLength: {
                      value: 2,
                      message: 'Last Name should have atleast 2 characters',
                    },
                  })}
                />
                {errors.lastName && (
                  <span className='text-danger'>{errors.lastName.message}</span>
                )}
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Email is invalid',
                    },
                  })}
                />
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='phoneNumber'>Mobile Number</label>
                <input
                  type='text'
                  className='form-control'
                  id='phoneNumber'
                  {...register('phoneNumber', {
                    required: 'Mobile Number is required',
                    validate: (value: string) => {
                      return value?.length === 10 || 'Mobile Number is invalid';
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <span className='text-danger'>{errors.phoneNumber.message}</span>
                )}
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='dob'>Date of Birth</label>
                <input type='date' className='form-control' id='dob' {...register('dob')} />
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='gender'>Gender</label>
                {GENDER.map((gender) => (
                  <div className='form-check' key={gender}>
                    <input
                      className='form-check-input'
                      type='radio'
                      id={gender}
                      value={gender}
                      {...register('gender', {
                        required: 'Gender is required',
                      })}
                    />
                    <label className='form-check-label' htmlFor={gender}>
                      {gender}
                    </label>
                  </div>
                ))}
                {errors.gender && <span className='text-danger'>{errors.gender.message}</span>}
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password should have atleast 6 characters',
                    },
                  })}
                />
                {errors.password && (
                  <span className='text-danger'>{errors.password.message}</span>
                )}
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='confirmPassword'
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: (value) => {
                      return value === watch('password') || 'Passwords do not match';
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <span className='text-danger'>{errors.confirmPassword.message}</span>
                )}
              </div>
              <button className='btn btn-primary' type='submit' disabled={isSubmitting}>
                Register
              </button>
              <button
                className='btn btn-warning ms-2'
                type='button'
                onClick={() => router.push('/login')}>
                Go to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
