"use client"

import { FaCheck, FaCheckDouble } from 'react-icons/fa';
import styles from './styles.module.scss';

export default function RightMessage(props: any) {

  const { message } = props;

  return (
    <>
      <div className={styles.container}>
        <button className='relative flex flex-col items-end'>

          <div className={styles.content}>
            {message.link ? (<img src={message.link} alt="Image" />) : (<></>)}
            {message.text}
          </div>
          <div className='flex m-1'>
            <div className={styles.time}>{new Date(message.createTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
            {message.status === "Unread" ? (<FaCheck className="fill-gray-400 p-0.5" />) : (<FaCheckDouble className="fill-blue-400 p-0.5" />)}
          </div>
        </button>
      </div>
    </>
  )
}