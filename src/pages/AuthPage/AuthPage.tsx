import React, { useState, useEffect } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import styles from './AuthPage.module.scss';
import { validateEmail } from '../../firebase/util';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({ value: '', isTouched: false });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Logged in successfully');
        navigate('/dashboard');
      } else {
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password.value);
      toast.success('Logged in successfully');
      setTimeout(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      console.error('Error during email login:', error);
      toast.error('Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Logged in with Google');
      setTimeout(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      console.error('Error during Google login:', error);
      toast.error('Google login failed');
    }
  };

  const getIsFormValid = () => {
    return validateEmail(email) && password.value.length >= 8;
  };

  return (
    <div className={styles['auth-page']}>
      <div className={styles['auth-container']}>
        <div className={styles['auth-form']}>
          <h2>Login with Email and Password</h2>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password.value}
            onChange={(e) =>
              setPassword({ ...password, value: e.target.value })
            }
          />
          <button onClick={handleEmailLogin} disabled={!getIsFormValid()}>
            Login
          </button>
          <button onClick={handleGoogleLogin}>Sign In with Google</button>

          <div className={styles['auth-switch']}>
            <p>Don't have an account?</p>
            <button onClick={() => navigate('/register')}>Register</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
