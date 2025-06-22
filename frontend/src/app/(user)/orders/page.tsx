import { Order } from '@/api/order';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const OrdersPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return redirect('/login');
  }

  const res = await fetch('http://localhost:8000/api/order', {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className='container mt-5'>
        <h1 className='mb-4'>My Orders</h1>
        <p className='text-danger'>Failed to fetch orders. Please try again later.</p>
      </div>
    );
  }

  const data = await res.json();
  const orders: Order[] = Array.isArray(data.data) ? data.data : [data.data];

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>My Orders</h1>

      {orders.length === 0 ? (
        <p className='text-muted'>No orders found.</p>
      ) : (
        <div className='table-responsive'>
          <table className='table table-bordered table-hover align-middle'>
            <thead className='table-dark'>
              <tr>
                <th scope='col'>Order ID</th>
                <th scope='col'>Date</th>
                <th scope='col'>Items</th>
                <th scope='col'>Total</th>
                <th scope='col'>Payment</th>
                <th scope='col'>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <ul className='list-unstyled mb-0'>
                      {order.items.map((item) => (
                        <li key={item.product}>
                          {item.title} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    {order.isDelivered ? (
                      <span className='badge bg-success'>Delivered</span>
                    ) : (
                      <span className='badge bg-warning text-dark'>Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
