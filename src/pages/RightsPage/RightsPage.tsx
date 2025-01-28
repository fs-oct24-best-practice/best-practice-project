import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './RightsPage.module.scss';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/hooks';

export const RightsPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <div
      className={classNames(styles.container, {
        [styles['theme-light']]: theme === 'light',
        [styles['theme-dark']]: theme === 'dark',
      })}
    >
      <h1 className={styles.title}>{t('team_rules_title')}</h1>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>{t('rules')}</h2>
        <ol className={styles.list}>
          <li>{t('rule_1')}</li>
          <li>{t('rule_2')}</li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>{t('rights_and_responsibilities')}</h2>

        <h3 className={styles.subsubtitle}>{t('rights2')}</h3>
        <ul className={styles.list}>
          <li>{t('right_1')}</li>
          <li>{t('right_2')}</li>
          <li>{t('right_3')}</li>
          <li>{t('right_4')}</li>
        </ul>

        <h3 className={styles.subsubtitle}>{t('responsibilities')}</h3>
        <ol className={styles.list}>
          <li>{t('responsibility_1')}</li>
          <li>{t('responsibility_2')}</li>
          <li>{t('responsibility_3')}</li>
          <li>{t('responsibility_4')}</li>
          <li>{t('responsibility_5')}</li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>{t('main_rule_title')}</h2>
        <p className={styles.text}>{t('main_rule')}</p>
      </section>
    </div>
  );
};
