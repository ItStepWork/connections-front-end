import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";
import { BsCalendarDate, BsEnvelope, BsHeart } from 'react-icons/bs';
import styles from './aboutCard.module.scss';

export const AboutCard = async () => {

  const session = await getServerSession(authConfig);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Немного про себя</h2>
          <span>{session?.user?.aboutMe}</span>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsCalendarDate size={18} />
          </div>
          <p>День рождения: <span>{session?.user?.born}</span></p>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsHeart size={18} />
          </div>
          <p>Семейное положение: <span>{session?.user?.familyStatus}</span></p>
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