import styles from './ContactsPage.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import classNames from 'classnames';
import dianaPhoto from '../../assets/avatars/ds.png';
import yevheniiPhoto from '../../assets/avatars/ye.png';
import anatoliiPhoto from '../../assets/avatars/at.png';
import vshchukinPhoto from '../../assets/avatars/VS.png';
import vsavenetsPhoto from '../../assets/avatars/save.png';

export const ContactsPage: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const teamMembers = [
    {
      name: 'Diana Skrypnyk',
      role: 'Junior Front-End Developer',
      phone: '380 99 123 4567',
      email: '123@gmail.com',
      photo: dianaPhoto,
    },
    {
      name: 'Yevhenii Kucherenko',
      role: 'Team Lead',
      phone: '380 99 123 4567',
      email: 'chelsea7smile@gmail.com',
      photo: yevheniiPhoto,
    },
    {
      name: 'Anatolii Tarhonii',
      role: 'Junior Front-End Developer',
      phone: '380 99 123 4567',
      email: '123@gmail.com',
      photo: anatoliiPhoto,
    },
    {
      name: 'Vitalii Shchukin',
      role: 'Junior Front-End Developer',
      phone: '380 99 123 4567',
      email: '123@gmail.com',
      photo: vshchukinPhoto,
    },
    {
      name: 'Vitalii Savenets',
      role: 'Junior Front-End Developer',
      phone: '380 99 123 4567',
      email: '123@gmail.com',
      photo: vsavenetsPhoto,
    },
  ];

  return (
    <div className={styles.container}>
      <h2
        className={classNames(styles.title, {
          [styles['theme-dark']]: theme === 'dark',
        })}
      >
        About us
      </h2>

      <h3
        className={classNames(styles.subtitle, {
          [styles['theme-dark']]: theme === 'dark',
        })}
      >
        Best Members of Best Practice team
      </h3>

      <div className={styles['cards-container']}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.photo}>
              <img
                src={member.photo}
                alt={member.name}
                className={styles['photo-img']}
              />
            </div>
            <h4 className={styles.name}>{member.name}</h4>
            <p className={styles.occupation}>{member.role}</p>

            <div>
              <p>Tel: {member.phone}</p>
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </div>

            <div className={styles['links-wrapper']}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
