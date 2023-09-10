"use client"
import { BsCalendarDate, BsEnvelope, BsHeart } from 'react-icons/bs';
import { useStore } from "../../../../../stores/userDataStore";
import styles from './styles.module.scss';


export const AboutCard = (props: any) => {

  const [aboutMe, born, email, familyStatus] =
    useStore((state) => [state.aboutMe, state.born, state.email, state.familyStatus])


  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{props.local.groups.aboutGroup.about}</h2>
          <div className={styles.description}>
            <p className="  word-break: break-all"> {props.group.description}</p>
          </div>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsCalendarDate size={18} />
          </div>
          <p>{props.local.groups.aboutGroup.people}<span>{props.members}</span> {props.local.groups.aboutGroup.members}</p>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsHeart size={18} />
          </div>
          <p>{props.local.groups.aboutGroup.status} <span>{props.group.audience}</span></p>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsEnvelope size={18} />
          </div>
          <p>{props.local.groups.aboutGroup.mail}<span>{props.group.email}</span></p>
        </div>
      </div>
    </>
  )
}