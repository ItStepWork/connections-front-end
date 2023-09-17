"use client"
import { useEffect, useState } from "react";
import { BsCalendarDate, BsEnvelope, BsHeart } from 'react-icons/bs';
import { useStore } from "../../../../../stores/userDataStore";
import { AboutMePreloader } from "../../loaders/aboutMePreloader";
import styles from './aboutCard.module.scss';


export const AboutCard = (props: any) => {

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
          <h2>{props.local.aboutMe.subtitle}</h2>
          <span>{aboutMe}</span>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsCalendarDate size={18} />
          </div>
          <p>{props.local.aboutMe.birthday}<span>{born}</span></p>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsHeart size={18} />
          </div>
          <p>{props.local.aboutMe.familyStatus}<span>{familyStatus}</span></p>
        </div>  
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsEnvelope size={18} />
          </div>
          <p>Email: <span>{email}</span></p>
        </div>
      </div>
    </>
  )
}