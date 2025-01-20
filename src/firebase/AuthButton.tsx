import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AuthButton: React.FC = () => {
  const navigate = useNavigate();

  const handleAuthRedirect = () => {
    navigate('/auth');
  };

  return (
    <button
      onClick={handleAuthRedirect}
      style={{ background: 'none', border: 'none' }}
    >
      <FaRegUser size={20} />
    </button>
  );
};

export default AuthButton;
