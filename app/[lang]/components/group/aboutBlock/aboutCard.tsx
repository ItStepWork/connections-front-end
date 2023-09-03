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
          <h2>О группе</h2>
          <div className={styles.description}>
            <p className="  word-break: break-all"> {props.group.description}</p>
          </div>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsCalendarDate size={18} />
          </div>
          <p>Люди: <span>{props.members}</span> участников</p>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsHeart size={18} />
          </div>
          <p>Статус: <span>{props.group.audience}</span></p>
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