"use client"
import { AiOutlineMail } from 'react-icons/ai';
import { BsBriefcase, BsCalendar2Plus, BsCalendarDate, BsGeoAlt, BsHeart } from 'react-icons/bs';
import { useStore } from '../../../../../stores/userDataStore';
import styles from './profileInfo.module.scss';


export const ProfileInfo = () => {

  const [aboutMe, born, work, familyStatus, location, joined, email] = useStore ((state) => [state.aboutMe, state.born, state.work, state.familyStatus, state.location, state.joined, state.email])
  return (
    <>
      <div className={styles.container}>
        <h2>Информация Профиля</h2>
        <div className={styles.aboutMe}>
          <h3>Oбзор</h3>
          <p>{aboutMe}</p>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <BsCalendarDate size={18} />
            <p>День рождения<span>{born}</span></p>
          </div>
          <div className={styles.cont}>
            <BsHeart size={18} />
            <p>Статус: <span>{familyStatus}</span></p>
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <BsBriefcase size={18} />
            <p>Работаю: <span>{work}</span></p>
          </div>
          <div className={styles.cont}>
            <BsGeoAlt size={18} />
            <p>Живу в: <span>{location}</span></p>
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <BsCalendar2Plus size={16} />
            <p>Присоединился: <span>{joined} </span></p>
          </div>
          <div className={styles.cont}>
            <AiOutlineMail size={18} />
            <p>Email: <span>{email}</span></p>
          </div>
        </div>
      </div >
    </>
  )
}