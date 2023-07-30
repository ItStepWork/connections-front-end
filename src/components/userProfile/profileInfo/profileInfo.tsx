"use client"
import { useSession } from 'next-auth/react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsBriefcase, BsCalendar2Plus, BsCalendarDate, BsGeoAlt, BsHeart } from 'react-icons/bs';
import styles from './profileInfo.module.scss';

export const ProfileInfo = () => {

  const { data: session } = useSession();

  return (
    <>
      <div className={styles.container}>
        <h2>Информация Профиля</h2>
        <div className={styles.aboutMe}>
          <h3>Oбзор</h3>
          <p>{session?.user?.aboutMe}</p>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <BsCalendarDate size={18} />
            <p>День рождения<span>{session?.user?.born}</span></p>
          </div>
          <div className={styles.cont}>
            <BsHeart size={18} />
            <p>Статус: <span>{session?.user?.work}</span></p>
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <BsBriefcase size={18} />
            <p>Работаю: <span>{session?.user?.work}</span></p>
          </div>
          <div className={styles.cont}>
            <BsGeoAlt size={18} />
            <p>Живу в: <span>{session?.user?.location}</span></p>
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <BsCalendar2Plus size={16} />
            <p>Присоединился: <span>{session?.user?.joined} </span></p>
          </div>
          <div className={styles.cont}>
            <AiOutlineMail size={18} />
            <p>Email: <span>{session?.user?.email}</span></p>
          </div>
        </div>
      </div >
    </>
  )
}