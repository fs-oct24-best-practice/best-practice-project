import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { Theme } from '../types/Theme';

const AuthButton: React.FC = () => {
  const navigate = useNavigate();

  const handleAuthRedirect = () => {
    navigate('/auth');
  };

  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <button
      onClick={handleAuthRedirect}
      style={
        theme === Theme.DARK
          ? { background: 'none', border: 'none', color: 'white' }
          : { background: 'none', border: 'none' }
      }
    >
      <FaRegUser size={20} />
    </button>
  );
};

export default AuthButton;
