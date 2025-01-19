import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useAppSelector } from './hooks/hooks';

export const App = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <div className={`App `}>
      <Header />

      <main className={`main ${theme}`}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
