import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/hooks';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const theme = useAppSelector((state) => state.theme.theme);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'ua' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div
      className={`${styles.language_switcher} ${theme === 'dark' ? styles.dark : styles.light}`}
    >
      <span
        className={`${styles.currentLanguage} ${theme === 'dark' ? styles.darkText : styles.lightText}`}
      >
        {currentLanguage.toUpperCase()}
      </span>
      <div
        className={`${styles.switch} ${theme === 'dark' ? styles.darkSwitch : styles.lightSwitch}`}
        onClick={toggleLanguage}
      >
        <div
          className={`${styles.slider} ${currentLanguage === 'en' ? styles.en : styles.ua}`}
        />
      </div>
    </div>
  );
};

export default LanguageSwitcher;
