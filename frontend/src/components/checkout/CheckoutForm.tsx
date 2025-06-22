'use client';

import { Dispatch, SetStateAction } from 'react';

type CheckoutFormProps = {
  formData: {
    address: string;
    phone: string;
    city: string;
    postalCode: string;
    country: string;
    paymentMethod: string;
  };
  setFormData: Dispatch<
    SetStateAction<{
      address: string;
      phone: string;
      city: string;
      postalCode: string;
      country: string;
      paymentMethod: string;
    }>
  >;
};

const CheckoutForm = ({ formData, setFormData }: CheckoutFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <h4 className='mb-3'>Shipping Details</h4>
      <div className='mb-3'>
        <label className='form-label'>Address</label>
        <input
          type='text'
          className='form-control'
          name='address'
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Phone</label>
        <input
          type='text'
          className='form-control'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>City</label>
        <input
          type='text'
          className='form-control'
          name='city'
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Postal Code</label>
        <input
          type='text'
          className='form-control'
          name='postalCode'
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Country</label>
        <input
          type='text'
          className='form-control'
          name='country'
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>

      <h4 className='mb-3'>Payment Method</h4>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='radio'
          name='paymentMethod'
          value='cod'
          checked={formData.paymentMethod === 'cod'}
          onChange={handleChange}
        />
        <label className='form-check-label'>Cash on Delivery</label>
      </div>
      <div className='form-check mb-3'>
        <input
          className='form-check-input'
          type='radio'
          name='paymentMethod'
          value='card'
          checked={formData.paymentMethod === 'card'}
          onChange={handleChange}
        />
        <label className='form-check-label'>Credit/Debit Card</label>
      </div>
    </form>
  );
};

export default CheckoutForm;
