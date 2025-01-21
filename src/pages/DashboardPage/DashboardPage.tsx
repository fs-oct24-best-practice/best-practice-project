import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/hooks';
import { CartItem } from '../../components/CartItem/CartItem';
import { ProductInCart } from '../../types/ProductInCart';
import styles from './DashboardPage.module.scss';
import { useTranslation } from 'react-i18next';

interface Order {
  items: ProductInCart[];
  totalCost: number;
  totalItems: number;
  date: string;
}

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme.theme);

  const [activeSection, setActiveSection] = useState<
    'lastOrder' | 'orderHistory'
  >('lastOrder');
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const lastOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('user');
      toast.info(t('loginSuccess'));
      navigate('/auth');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error(t('loginFailed'));
    }
  };

  return (
    <div className={`${styles['dashboard-page']} ${styles[theme]}`}>
      <h2>
        {t('welcomeMessage2')}, {user?.email || t('guest')}!
      </h2>
      <p>{t('thisIsYourDashboard')}</p>
      <button
        className={`${styles['logout-button']} ${styles[theme]}`}
        onClick={handleLogout}
      >
        {t('logout')}
      </button>

      <div className={`${styles['orders-section']} ${styles[theme]}`}>
        <h3>{t('myOrders')}</h3>
        <div className={styles['order-buttons']}>
          <button
            className={`${activeSection === 'lastOrder' ? styles.active : ''} ${styles[theme]}`}
            onClick={() => setActiveSection('lastOrder')}
          >
            {t('lastOrder')}
          </button>
          <button
            className={`${activeSection === 'orderHistory' ? styles.active : ''} ${styles[theme]}`}
            onClick={() => setActiveSection('orderHistory')}
          >
            {t('orderHistory')}
          </button>
        </div>

        {activeSection === 'lastOrder' && lastOrder && (
          <div className={`${styles['order-content']} ${styles[theme]}`}>
            <h4>{t('lastOrder')}</h4>
            <div>
              {lastOrder.items.map((item: ProductInCart, index: number) => (
                <CartItem key={index} item={item} isDisabled={true} />
              ))}
            </div>
            <p>
              {t('totalCost')}: ${lastOrder.totalCost}
            </p>
            <p>
              {t('orderedOn')}: {new Date(lastOrder.date).toLocaleDateString()}
            </p>
          </div>
        )}

        {activeSection === 'orderHistory' && (
          <div className={`${styles['order-content']} ${styles[theme]}`}>
            <h4>{t('orderHistory')}</h4>
            {orders.length === 0 ? (
              <p>{t('noPreviousOrders')}</p>
            ) : (
              orders.map((order: Order, index: number) => (
                <div key={index}>
                  <h5>
                    {t('orderPlacedOn')}:{' '}
                    {new Date(order.date).toLocaleDateString()}
                  </h5>
                  <div>
                    {order.items.map((item: ProductInCart, idx: number) => (
                      <CartItem key={idx} item={item} isDisabled={true} />
                    ))}
                  </div>
                  <p>
                    {t('totalCost')}: ${order.totalCost}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
