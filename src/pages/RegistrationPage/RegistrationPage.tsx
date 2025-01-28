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
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/hooks';
import cn from 'classnames';

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  /* eslint-disable */
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
  const theme = useAppSelector((state) => state.theme.theme);

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
    if (!email) newErrors.email = t('emailRequired');
    if (!firstName) newErrors.firstName = t('firstNameRequired');
    if (!lastName) newErrors.lastName = t('lastNameRequired');
    if (!phoneNumber) newErrors.phoneNumber = t('phoneNumberRequired');
    if (!city) newErrors.city = t('cityRequired');
    if (!newPostOffice) newErrors.newPostOffice = t('novaPoshtaOfficeRequired');
    if (!password) newErrors.password = t('passwordRequired');
    if (!confirmPassword)
      newErrors.confirmPassword = t('confirmPasswordRequired');

    if (password !== confirmPassword)
      newErrors.confirmPassword = t('passwordsDoNotMatch');

    if (password.length < 8)
      newErrors.password = t('passwordLengthRequirement');

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

      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: t('emailAlreadyInUse'),
        }));
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const signInCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem('user', JSON.stringify({ ...formData, email }));

      toast.success(t('registrationSuccess'));
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(t('registrationFailed'));
      } else {
        toast.error(t('unknownError'));
      }
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(formData).every((value) => value.trim() !== '');

  const isButtonDisabled = submitted && !isFormValid;

  return (
    <div className={cn(styles['registration-page'], styles[theme])}>
      <h2 className={styles['registration-page__title']}>{t('register')}</h2>
      <div className={styles['registration-page__form-group']}>
        {Object.keys(formData).map((field) => (
          <div
            key={field}
            className={styles['registration-page__input-container']}
          >
            <input
              type={
                field.toLowerCase().includes('password') ? 'password' : 'text'
              }
              name={field}
              placeholder={
                field === 'newPostOffice'
                  ? t('novaPoshtaOffice')
                  : field
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())
              }
              value={formData[field as keyof FormData]}
              onChange={handleInputChange}
              className={`${styles['registration-page__input']} ${
                submitted && errors[field]
                  ? styles['registration-page__input--error']
                  : ''
              }`}
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
        className={`${styles['registration-page__register-button']} ${
          isButtonDisabled
            ? styles['registration-page__register-button--disabled']
            : ''
        }`}
        onClick={handleRegister}
        disabled={isButtonDisabled}
      >
        {t('register2')}
      </button>
    </div>
  );
};
