"use client"
import { useSession } from "next-auth/react";
import { BsCalendarDate, BsEnvelope, BsHeart } from 'react-icons/bs';
import styles from './aboutCard.module.scss';
import { useStore } from "@/stores/userDataStore";


export const AboutCard = () => {

  const { data: session } = useSession();
  const [aboutMe, born, email, familyStatus] = 
  useStore((state) => [state.aboutMe, state.born, state.email, state.familyStatus])
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Немного про себя</h2>
          <span>{aboutMe}</span>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsCalendarDate size={18} />
          </div>
          <p>День рождения: <span>{born}</span></p>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsHeart size={18} />
          </div>
          <p>Семейное положение: <span>{familyStatus}</span></p>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsEnvelope size={18} />
          </div>
          <p>Почта: <span>{email}</span></p>
        </div>
      </div>
    </>
  )
}