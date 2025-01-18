import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './RegistrationPage.module.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  newPostOffice: string;
  password: string;
  confirmPassword: string;
}

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    newPostOffice: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: '',
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      city,
      newPostOffice,
      password,
      confirmPassword,
    } = formData;
    const newErrors: { [key: string]: string } = {};

    // Validation checks
    if (!email) newErrors.email = 'Email is required';
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!city) newErrors.city = 'City is required';
    if (!newPostOffice)
      newErrors.newPostOffice = 'Nova Poshta office is required';
    if (!password) newErrors.password = 'Password is required';
    if (!confirmPassword)
      newErrors.confirmPassword = 'Confirm password is required';

    if (password !== confirmPassword)
      newErrors.password = 'Passwords do not match';
    if (password.length < 8)
      newErrors.password = 'Password must be at least 8 characters long';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('user', JSON.stringify({ ...formData, email }));
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed');
      console.error(error);
    }
  };

  return (
    <div className={styles['registration-page']}>
      <h2 className={styles['registration-page__title']}>Register</h2>
      <div className={styles['registration-page__form-group']}>
        {[
          'firstName',
          'lastName',
          'email',
          'phoneNumber',
          'city',
          'newPostOffice',
          'password',
          'confirmPassword',
        ].map((field) => (
          <div
            key={field}
            className={styles['registration-page__input-container']}
          >
            <input
              type={field.includes('password') ? 'password' : 'text'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field as keyof FormData]}
              onChange={handleInputChange}
              className={`${styles['registration-page__input']} ${errors[field] ? styles['registration-page__input--error'] : ''}`}
            />
            {errors[field] && (
              <span className={styles['registration-page__error']}>
                {errors[field]}
              </span>
            )}
          </div>
        ))}
      </div>
      <button
        className={`${styles['registration-page__register-button']} ${Object.keys(errors).length > 0 ? styles['registration-page__register-button--disabled'] : ''}`}
        onClick={handleRegister}
        disabled={Object.keys(errors).length > 0}
      >
        Register
      </button>
    </div>
  );
};
