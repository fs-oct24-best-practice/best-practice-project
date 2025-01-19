import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './DashboardPage.module.scss';
import { CartItem } from '../../components/CartItem/CartItem';
import { ProductInCart } from '../../types/ProductInCart';

interface Order {
  items: ProductInCart[];
  totalCost: number;
  totalItems: number;
  date: string;
}

export const DashboardPage: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<
    'lastOrder' | 'orderHistory'
  >('lastOrder');

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');

  const lastOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('user');
      toast.info('Logged out successfully');
      navigate('/auth');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <div className={styles['dashboard-page']}>
      <h2>Welcome, {user?.email || 'Guest'}!</h2>
      <p>This is your dashboard.</p>
      <button className={styles['logout-button']} onClick={handleLogout}>
        Logout
      </button>

      <div className={styles['orders-section']}>
        <h3>My Orders</h3>
        <div className={styles['order-buttons']}>
          <button
            className={activeSection === 'lastOrder' ? styles.active : ''}
            onClick={() => setActiveSection('lastOrder')}
          >
            Last Order
          </button>
          <button
            className={activeSection === 'orderHistory' ? styles.active : ''}
            onClick={() => setActiveSection('orderHistory')}
          >
            Order History
          </button>
        </div>

        {activeSection === 'lastOrder' && lastOrder && (
          <div className={styles['order-content']}>
            <h4>Last Order</h4>
            <div>
              {lastOrder.items.map((item: ProductInCart, index: number) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
            <p>Total: ${lastOrder.totalCost}</p>
            <p>Ordered on: {new Date(lastOrder.date).toLocaleDateString()}</p>
          </div>
        )}

        {activeSection === 'orderHistory' && (
          <div className={styles['order-content']}>
            <h4>Order History</h4>
            {orders.length === 0 ? (
              <p>No previous orders.</p>
            ) : (
              orders.map((order: Order, index: number) => (
                <div key={index}>
                  <h5>
                    Order placed on: {new Date(order.date).toLocaleDateString()}
                  </h5>
                  <div>
                    {order.items.map((item: ProductInCart, idx: number) => (
                      <CartItem key={idx} item={item} />
                    ))}
                  </div>
                  <p>Total: ${order.totalCost}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
