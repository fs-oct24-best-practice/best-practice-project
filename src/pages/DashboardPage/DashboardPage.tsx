import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './DashboardPage.module.scss';

export const DashboardPage: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<
    'lastOrder' | 'orderHistory'
  >('lastOrder');

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

        {activeSection === 'lastOrder' && (
          <div className={styles['order-content']}>
            <h4>Last Order</h4>
            <p>Information about the last order.</p>
          </div>
        )}

        {activeSection === 'orderHistory' && (
          <div className={styles['order-content']}>
            <h4>Order History</h4>
            <p>List of all previous orders.</p>
          </div>
        )}
      </div>
    </div>
  );
};
