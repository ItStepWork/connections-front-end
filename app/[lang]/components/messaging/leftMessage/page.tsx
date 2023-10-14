"use client"
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MessagingService } from '../../../../../services/messaging.service';
import styles from './styles.module.scss';
import { useInView } from 'react-intersection-observer';
import { MessageStatus } from '../../../../../enums/all.enum';

export default function LeftMessage(props: any) {

  const {
    message,
    loadMessages,
    loadDialogs,
    user,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<MessageStatus>(message.status);

  const { ref, inView} = useInView({
    threshold: 0.5,
  });

  const removeMessage = async () => {
    await MessagingService.removeMessage(message.id);
    loadMessages(user.id);
    loadDialogs();
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(message.text);
  }

  const updateMessageStatus = async () => {
    await MessagingService.updateMessageStatus(message.id, message.senderId)
    setStatus(MessageStatus.Read);
    return <></>;
  }

  return (
    <>
      <div className={styles.container} ref={ref}>
        <button className='relative flex' onClick={() => { if (!isOpen) setIsOpen(true) }} onFocus={() => { if (isOpen) setIsOpen(true) }} onBlur={() => setIsOpen(false)}>

          {user.avatarUrl ? (<img className={styles.userImage} src={user.avatarUrl} />) : (<FaUserCircle className={styles.userImage} />)}
          <div className={styles.verticalContainer}>
            <div className={styles.content}>
              {message.link ? (<img src={message.link} alt="Image" />) : (<></>)}
              {message.text}
            </div>
            <div className={styles.time}>{new Date(message.createTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
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
        {inView && status === MessageStatus.Unread &&
          updateMessageStatus()
        }
      </div>
    </>
  )
}