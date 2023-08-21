import Image from 'next/image';
import { FC, useState } from "react";
import { BsFillSendCheckFill, BsFillSendFill, BsThreeDots, BsTrash } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdOutlineNotificationsOff } from 'react-icons/md';
import styles from './cardItem.module.scss';

interface ICardProps {
  howCelebrating: string;
  avatar: string;
  fullName: string;
  date: string;
}

const CardItem:FC<ICardProps> = ({howCelebrating, avatar, fullName, date}) => {
  const [isSend, setSend] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.avatarContainer}>
        <Image
                src={avatar}
                width={76}
                height={76}
                quality={80}
                style={{ objectFit: "contain" }}
                alt="avatar"
                loading="lazy"
              />
        </div>
        <div className={styles.fromContainer}>
          <div className={styles.headBlock}>
            <div className={styles.name}>
              <h4>{fullName}</h4>
              <p>Празднует свой день рождения { date === '' ? 'сегодня' : date}</p>
            </div>
            <button type="button" 
              onClick={() => { if (!isOpen) setIsOpen(true) }} 
              onFocus={() => { if (!isOpen) setIsOpen(true) }} 
              onBlur={() => setIsOpen(false)} 
              className="button"><BsThreeDots size={20}/>
             {
              isOpen &&
              <div className={styles.dropMenu}>             
                <div className={styles.item}><BsTrash size={16} />Удалить</div>
                <div className={styles.item}><IoIosNotificationsOutline size={18}/> Отключить оповещения</div>
                <div className={styles.item}><MdOutlineNotificationsOff size={18}/> Заглушить</div>
              </div>
             }
              
            </button>
          </div>
          <div className={styles.sendForm}>
            <textarea className={styles.textarea} placeholder={howCelebrating} rows={1}></textarea>
            <button onClick={() => setSend(true)} 
            className={isSend ? styles.buttonChecked : styles.button}>
              { isSend ? <BsFillSendCheckFill size={16}/> : <BsFillSendFill size={16}/>}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardItem;