"use client"
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MessagingService } from '../../../../../services/messaging.service';
import styles from './styles.module.scss';

export default function LeftMessage(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const removeMessage = async () => {
    await MessagingService.removeMessage(props.message.id);
    props.loadMessages(props.user.id);
    props.loadDialogs();
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(props.message.text);
  }

  return (
    <>
      <div className={styles.container}>
        <button className='relative flex' onClick={() => { if (!isOpen) setIsOpen(true) }} onFocus={() => { if (isOpen) setIsOpen(true) }} onBlur={() => setIsOpen(false)}>

          {props.user.avatarUrl ? (<img className={styles.userImage} src={props.user.avatarUrl} />) : (<FaUserCircle className={styles.userImage} />)}
          <div className={styles.verticalContainer}>
            <div className={styles.content}>
              {props.message.link ? (<img src={props.message.link} alt="Image" />) : (<></>)}
              {props.message.text}
            </div>
            <div className={styles.time}>{new Date(props.message.createTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          </div>

          {isOpen &&
            <div className='z-50 absolute top-0 left-0 text-sm'>
              <div className=' ml-5 px-3 py-1 items-center bg-white text-gray-900 border border-light_border rounded-lg dark:text-dark_text_gray dark:bg-dark_background dark:border-dark_border'>
                <div className='text-dark_text_gray hover:text-button_blue_BG' onClick={() => { setIsOpen(false); copyMessage(); }}>Копировать</div>
                <div className='text-dark_text_gray hover:text-button_red_BG' onClick={() => { setIsOpen(false); removeMessage(); }}>Удалить</div>
              </div>
            </div>
          }
        </button>
      </div>
    </>
  )
}