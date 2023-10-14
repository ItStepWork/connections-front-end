"use client"

import { FaUserCircle } from 'react-icons/fa';
import styles from './styles.module.scss';

export default function LeftMessage(props: any) {

  const {
    user,
    message
  } = props;

  return (
    <>
      <div className={styles.container}>
        <button className='relative flex'>
          {user.avatarUrl ? (<img className={styles.userImage} src={user.avatarUrl} />) : (<FaUserCircle className={styles.userImage} />)}
          <div className={styles.verticalContainer}>
            <div className={styles.content}>
              {message.link ? (<img src={message.link} alt="Image" />) : (<></>)}
              {message.text}
            </div>
            <div className={styles.time}>{new Date(message.createTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          </div>

        </button>
      </div>
    </>
  )
}