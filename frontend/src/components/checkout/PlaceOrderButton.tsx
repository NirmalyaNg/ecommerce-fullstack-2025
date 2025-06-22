'use client';

export const PlaceOrderButton = ({ onPlaceOrder }: { onPlaceOrder: () => void }) => {
  const handleOrder = () => {
    onPlaceOrder();
  };

  return (
    <button className='btn btn-success w-100 mt-3' onClick={handleOrder}>
      Place Order
    </button>
  );
};
