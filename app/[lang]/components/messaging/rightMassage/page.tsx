"use client"
import { useState } from 'react';
import { FaCheck, FaCheckDouble } from 'react-icons/fa';
import { MessagingService } from '../../../../../services/messaging.service';
import styles from './styles.module.scss';

export default function RightMessage(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const removeMessageFull = async () => {
    await MessagingService.removeMessageFull(props.message.id);
  }

  const removeMessage = async () => {
    await MessagingService.removeMessage(props.message.id);
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(props.message.text);
  }


  return (
    <>
      <div className={styles.container}>
        <button className='relative flex flex-col items-end' onClick={() => { if (!isOpen) setIsOpen(true) }} onFocus={() => { if (isOpen) setIsOpen(true) }} onBlur={() => setIsOpen(false)}>

        <div className={styles.content}>
          {props.message.link?(<img src={props.message.link} alt="Image" />):(<></>)}
          {props.message.text}
        </div>
        <div className='flex m-1'>
          <div className={styles.time}>{new Date(props.message.createTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          {props.message.status === "Unread"? (<FaCheck className="fill-gray-400 p-0.5"/>):(<FaCheckDouble className="fill-blue-400 p-0.5"/>)}
        </div>
        {isOpen &&
            <div className='z-50 absolute top-0 right-0 text-sm'>
              <div className=' ml-5 px-3 py-1 items-center whitespace-nowrap bg-white text-gray-900 border border-light_border rounded-lg dark:text-dark_text_gray dark:bg-dark_background dark:border-dark_border'>
                <div className='text-dark_text_gray hover:text-button_blue_BG' onClick={() => { setIsOpen(false); copyMessage(); }}>Копировать</div>
                <div className='text-dark_text_gray hover:text-button_red_BG' onClick={() => { setIsOpen(false); removeMessageFull(); }}>Удалить у всех</div>
                <div className='text-dark_text_gray hover:text-button_red_BG' onClick={() => { setIsOpen(false); removeMessage(); }}>Удалить у себя</div>
              </div>
            </div>
          }
          </button>
      </div>
    </>
  )
}