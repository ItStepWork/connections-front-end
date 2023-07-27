import { BsCalendarDate, BsEnvelope, BsHeart } from 'react-icons/bs'
import styles from './aboutCard.module.scss'
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export const AboutCard = async () => {

  const session = await getServerSession(authConfig);
  console.log(session);

  const tmpData = {
    description: 'Описание о человеке профиля будет браться из профиля.',
    born: '20 Октября, 1990г.',
    status: 'Не замужем',
    email: 'google.mail.@gmail.com'
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Немного про себя</h2>
          <span>{tmpData.description}</span>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsCalendarDate size={18} />
          </div>
          <p>День рождения: <span>{tmpData.born}</span></p>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsHeart size={18} />
          </div>
          <p>Семейное положение: <span>{tmpData.status}</span></p>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsEnvelope size={18} />
          </div>
          <p>Почта: <span>{session?.user?.email}</span></p>
        </div>
      </div>
    </>
  )
}