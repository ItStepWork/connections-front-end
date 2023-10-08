"use client"
import { AiOutlineMail } from 'react-icons/ai';
import { BsBriefcase, BsCalendar2Plus, BsCalendarDate, BsGenderAmbiguous, BsGeoAlt, BsHeart } from 'react-icons/bs';
import { useStore } from '../../../../../stores/userDataStore';
import styles from './profileInfo.module.scss';
import { FiPhoneCall } from 'react-icons/fi';


export const ProfileInfo = (props: any) => {

  // const [aboutMe, born, work, familyStatus, location, joined, email] = useStore ((state) => [state.aboutMe, state.born, state.work, state.familyStatus, state.location, state.joined, state.email])

  return (
    <>
      <div className={styles.container}>
        <h2>{props.local.profile.aboutMe.title}</h2>
        <div className={styles.aboutMe}>
          <h3>{props.local.profile.aboutMe.overview}</h3>
          <p>{props.user.aboutMe}</p>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <BsCalendarDate size={18} />
            <p>{props.local.profile.aboutMe.born}<span>{new Date(props.user.birthDay).toDateString()}</span></p>
          </div>
          <div className={styles.cont}>
            <BsHeart size={18} />
            <p>{props.local.profile.aboutMe.status}<span>{props.user.familyStatus}</span></p>
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <BsBriefcase size={18} />
            <p>{props.local.profile.aboutMe.work}<span>{props.user.work}</span></p>
          </div>
          <div className={styles.cont}>
            <BsGeoAlt size={18} />
            <p>{props.local.profile.aboutMe.live}<span>{props.user.location}</span></p>
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <BsCalendar2Plus size={16} />
            <p>{props.local.profile.aboutMe.join}<span>{new Date(props.user.createdTime).toDateString()} </span></p>
          </div>
          <div className={styles.cont}>
            <AiOutlineMail size={18} />
            <p>Email: <span>{props.user.email}</span></p>
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.cont}>
            <FiPhoneCall size={16} />
            <p>Tel:<span>{props.user.phone} </span></p>
          </div>
          <div className={styles.cont}>
            <BsGenderAmbiguous size={18} />
            <p>Gender: <span>{props.user.gender}</span></p>
          </div>
        </div>
      </div >
    </>
  )
}