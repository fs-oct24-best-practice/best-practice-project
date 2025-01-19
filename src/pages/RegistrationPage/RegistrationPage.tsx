import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './RegistrationPage.module.scss';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';

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

interface FirebaseError extends Error {
  code: string;
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
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value.trim() !== '' && newErrors[name]) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const validateForm = () => {
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
      newErrors.confirmPassword = 'Passwords do not match';

    if (password.length < 8)
      newErrors.password = 'Password must be at least 8 characters long';

    return newErrors;
  };

  const handleRegister = async () => {
    setSubmitted(true);

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { email, password } = formData;
      console.log('Registering with', email, password);

      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        toast.error('This email is already in use, please use another one');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('User created:', userCredential);

      const signInCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('User logged in:', signInCredential);

      localStorage.setItem('user', JSON.stringify({ ...formData, email }));

      toast.success('Registration and login successful');
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if ((error as FirebaseError).code === 'auth/email-already-in-use') {
          toast.error('This email is already in use');
        } else {
          toast.error('Registration failed');
        }
        console.error('Registration error:', error);
      } else {
        toast.error('An unknown error occurred');
        console.error('Unknown error:', error);
      }
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(formData).every((value) => value.trim() !== '');

  const isButtonDisabled = submitted && !isFormValid;

  return (
    <div className={styles['registration-page']}>
      <h2 className={styles['registration-page__title']}>Register</h2>
      <div className={styles['registration-page__form-group']}>
        {[
          'first Name',
          'last Name',
          'email',
          'phone Number',
          'city',
          'nova Poshta Office №',
          'password',
          'confirm Password',
        ].map((field) => (
          <div
            key={field}
            className={styles['registration-page__input-container']}
          >
            <input
              type={field.includes('password') ? 'password' : 'text'}
              name={field}
              placeholder={
                field === 'newPostOffice'
                  ? 'Nova Poshta Office №'
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={formData[field as keyof FormData]}
              onChange={handleInputChange}
              className={`${styles['registration-page__input']} ${submitted && errors[field] ? styles['registration-page__input--error'] : ''}`}
            />
            {submitted && errors[field] && (
              <span className={styles['registration-page__error']}>
                {errors[field]}
              </span>
            )}
          </div>
        ))}
      </div>
      <button
        className={`${styles['registration-page__register-button']} ${isButtonDisabled ? styles['registration-page__register-button--disabled'] : ''}`}
        onClick={handleRegister}
        disabled={isButtonDisabled}
      >
        Register
      </button>
    </div>
  );
};
