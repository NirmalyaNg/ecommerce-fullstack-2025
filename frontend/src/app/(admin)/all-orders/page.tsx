import { Order } from '@/models/order';
import { cookies } from 'next/headers';
import Link from 'next/link';

const AdminOrdersPage = async () => {
  // Get token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const response = await fetch('http://localhost:8000/api/order', {
    method: 'GET',
    headers: {
      Cookie: `token=${token}`,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  const res = await response.json();

  if (!res.success || !res.data) {
    return <p className='text-danger'>Failed to load orders.</p>;
  }

  const orders = Array.isArray(res.data) ? res.data : [res.data];

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>All Orders</h1>

      {orders.length === 0 ? (
        <p className='text-muted'>No orders found.</p>
      ) : (
        <div className='table-responsive'>
          <table className='table table-bordered table-hover align-middle'>
            <thead className='table-dark'>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total (₹)</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order) => (
                <tr key={order._id}>
                  <td>
                    <Link href={`/admin/orders/${order._id}`} className='text-decoration-none'>
                      {order._id}
                    </Link>
                  </td>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <td>{(order as any)?.user?.email ?? 'N/A'}</td>
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
                  <td>{order.totalAmount}</td>
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

export default AdminOrdersPage;
