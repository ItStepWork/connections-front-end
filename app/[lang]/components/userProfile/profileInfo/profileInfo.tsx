"use client"
import { AiOutlineMail } from 'react-icons/ai';
import { BsBriefcase, BsCalendar2Plus, BsCalendarDate, BsGenderAmbiguous, BsGeoAlt, BsHeart } from 'react-icons/bs';
import { FiPhoneCall } from 'react-icons/fi';
import styles from './profileInfo.module.scss';


export const ProfileInfo = (props: any) => {

  const {
    local,
    user
  } = props;

  return (
    <>
      <div className={styles.container}>
        <h2>{local.profile.aboutMe.title}</h2>
        <div className={styles.aboutMe}>
          <h3>{local.profile.aboutMe.overview}</h3>
          <p>{user.aboutMe}</p>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <BsCalendarDate size={18} />
            <p>{local.profile.aboutMe.born}<span>{user.createdTime ? new Date(user.birthDay).toLocaleDateString() : local.settings.placeholders.notIndicated}</span></p>
          </div>
          <div className={styles.cont}>
            <BsHeart size={18} />
            <p>{local.profile.aboutMe.status}<span>{user.familyStatus ? user.familyStatus : local.settings.placeholders.notIndicated}</span></p>
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <BsBriefcase size={18} />
            <p>{local.profile.aboutMe.work}<span>{user.work ? user.work : local.settings.placeholders.notIndicated}</span></p>
          </div>
          <div className={styles.cont}>
            <BsGeoAlt size={18} />
            <p>{local.profile.aboutMe.live}<span>{user.location ? user.location : local.settings.placeholders.notIndicated}</span></p>
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <BsCalendar2Plus size={16} />
            <p>{local.profile.aboutMe.join}<span>{user.createdTime ? new Date(user.createdTime).toLocaleDateString() : local.settings.placeholders.notIndicated} </span></p>
          </div>
          <div className={styles.cont}>
            <AiOutlineMail size={18} />
            <p>Email: <span>{user.email}</span></p>
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <FiPhoneCall size={16} />
            <p>{local.settings.phone} <span>{user.phone ? user.phone : local.settings.placeholders.notIndicated} </span></p>
          </div>
          <div className={styles.cont}>
            <BsGenderAmbiguous size={18} />
            <p>{local.settings.gender.title}: <span>{user.gender ? user.gender : local.settings.placeholders.notIndicated}</span></p>
          </div>
        </div>
      </div >
    </>
  )
}