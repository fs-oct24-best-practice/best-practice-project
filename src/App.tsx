import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Toaster } from 'react-hot-toast';
import toastStyles from './components/Card/Toaster/toastStyles.module.scss';
export const App = () => {
  return (
    <div className='App'>
      <Header />

      <main className='main'>
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
