"use client"
import { useSession } from "next-auth/react";
import { BsCalendarDate, BsEnvelope, BsHeart } from 'react-icons/bs';
import styles from './styles.module.scss';
import { useStore } from "@/stores/userDataStore";
import { AboutMePreloader } from "@/loaders/aboutMePreloader";
import { useEffect, useState } from "react";


export const AboutCard = (props:any) => {

  const [aboutMe, born, email, familyStatus] = 
  useStore((state) => [state.aboutMe, state.born, state.email, state.familyStatus])

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = 1000;
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {

    return <AboutMePreloader />;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>О группе</h2>
          {/* <span className={styles.description}>{props.group.description}</span> */}
          <div className={styles.description}>
                  <p className="  word-break: break-all"> {props.group.description}</p>
                </div>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsCalendarDate size={18} />
          </div>
          <p>Люди: <span>{Object.entries(props.group.users).length}</span> участников</p>
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