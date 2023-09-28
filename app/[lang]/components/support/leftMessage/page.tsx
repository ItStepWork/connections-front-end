"use client"

import { FaUserCircle } from 'react-icons/fa';
import styles from './styles.module.scss';

export default function LeftMessage(props: any) {

  return (
    <>
      <div className={styles.container}>
        <button className='relative flex'>
          {props.user.avatarUrl ? (<img className={styles.userImage} src={props.user.avatarUrl} />) : (<FaUserCircle className={styles.userImage} />)}
          <div className={styles.verticalContainer}>
            <div className={styles.content}>
              {props.message.link ? (<img src={props.message.link} alt="Image" />) : (<></>)}
              {props.message.text}
            </div>
            <div className={styles.time}>{new Date(props.message.createTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          </div>

        </button>
      </div>
    </>
  )
}