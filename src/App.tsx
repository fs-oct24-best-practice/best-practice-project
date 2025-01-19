import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useAppSelector } from './hooks/hooks';
import { Toaster } from 'react-hot-toast';
import toastStyles from './components/Card/Toaster/toastStyles.module.scss';
export const App = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <div className={`App `}>
      <Header />

      <main className={`main ${theme}`}>
        <Toaster
          position='bottom-right'
          reverseOrder={false}
          toastOptions={{
            className: toastStyles.customToast,
          }}
        />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
