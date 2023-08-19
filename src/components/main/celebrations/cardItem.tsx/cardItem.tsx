import Image from 'next/image';
import { FC, useState } from "react";
import { BsFillSendCheckFill, BsFillSendFill, BsThreeDots } from 'react-icons/bs';
import styles from './cardItem.module.scss';

interface ICardProps {
  howCelebrating: string;
  avatar: string;
  fullName: string;
  date: string;
}

const CardItem:FC<ICardProps> = ({howCelebrating, avatar, fullName, date}) => {
  const [send, setSend] = useState(false);

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
              />
        </div>
        <div className={styles.fromContainer}>
          <div className={styles.headBlock}>
            <div className={styles.name}>
              <h4>{fullName}</h4>
              <p>Празднует свой день рождения { date === '' ? 'сегодня' : date}</p>
            </div>
            <div className="button"><BsThreeDots size={20}/></div>
          </div>
          <div className={styles.sendForm}>
            <textarea className={styles.textarea} placeholder={howCelebrating} rows={1}></textarea>
            <button onClick={() => setSend(true)} 
            className={send ? styles.buttonChecked : styles.button}>
              { send ? <BsFillSendCheckFill size={16}/> : <BsFillSendFill size={16}/>}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardItem;