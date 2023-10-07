"use client"
import Image from 'next/image';
import { FC, useState } from "react";
import { BsFillSendCheckFill, BsFillSendFill, BsThreeDots, BsTrash } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdOutlineNotificationsOff } from 'react-icons/md';
import styles from './cardItem.module.scss';
import { EventType } from '../../../../../../enums/all.enum';
import { PostService } from '../../../../../../services/post.service';
import { toast } from 'react-toastify';
import CreatePost from '../../../posts/createPost/page';

// interface ICardProps {
//   howCelebrating: string;
//   avatar: string;
//   fullName: string;
//   date: string;
// }

export default function CardItem(props: any) {
  const [isSend, setSend] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [congratulations, setCongratulations] = useState<string>("Happy Birthday !")

  const notifySuccess = () => toast.success(props.local.createGroup.toasts.ok, {});
  const notifyErrorServer = () => toast.error(props.local.createGroup.toasts.error, {});
  const changeCongrats = (e: any) => {
    setCongratulations(e.target.value)
  }
  const sendCongrats = async () => {
    const data = new FormData()
    data.append("recipientId", props.event.user.id)
    data.append("text", congratulations);
    let result = await PostService.createPost(data);
    alert(result)
    // if (result != null && result != undefined) notifySuccess();
    // else notifyErrorServer();
  }

  return (
    <>{props.event.user &&
      <div className={styles.container}>
        <div className={styles.avatarContainer}>
          <img className=' rounded-full overflow-hidden w-20 h-20' src={props.event.user.avatarUrl} alt="avatar" loading="lazy" />
        </div>
        <div className={styles.fromContainer}>
          <div className={styles.headBlock}>
            <div className={styles.name}>
              <h4>{props.event.user.firstName} {props.event.user.lastName}</h4>
              {props.event.type === EventType.BirthDay && props.BirthDayNow
                ? <p>Святкує свій день народження сьогодні </p>
                : <></>
              }

            </div>
            {/* <button type="button"
              onClick={() => { if (!isOpen) setIsOpen(true) }}
              onFocus={() => { if (!isOpen) setIsOpen(true) }}
              onBlur={() => setIsOpen(false)}
              className="button"><BsThreeDots size={20} />
              {
                isOpen &&
                <div className={styles.dropMenu}>
                  <div className={styles.item}><BsTrash size={16} />Удалить</div>
                  <div className={styles.item}><IoIosNotificationsOutline size={18} /> Отключить оповещения</div>
                  <div className={styles.item}><MdOutlineNotificationsOff size={18} /> Заглушить</div>
                </div>
              }

            </button> */}
          </div>
          {props.event.type === EventType.BirthDay && props.BirthDayNow
            // ? <div className={styles.sendForm}>
            //   <textarea className={styles.textarea} defaultValue={congratulations} placeholder="Write your congratulations" rows={1} onChange={(e) => changeCongrats(e)}></textarea>
            //   <button onClick={() => { sendCongrats(); setSend(true); }}
            //     className={isSend ? styles.buttonChecked : styles.button}>
            //     {isSend ? <BsFillSendCheckFill size={16} /> : <BsFillSendFill size={16} />}
            //   </button>
            // </div>
            ? <CreatePost local={props.local} userId={props.event.user.id} placeholder={"Write your congratulations"} />
            : <></>
          }
          {props.event.type === EventType.BirthDay && !props.BirthDayNow
            ? <p>Святкує свій день народження {new Date(props.event.date).toLocaleDateString()} </p>
            : <></>
          }
          {props.event.type === EventType.Meeting || props.event.type === EventType.Celebration
            ? <div>
              <p>{props.event.type} </p>
              <p>{props.event.name} </p>
              <p>{new Date(props.event.date).toLocaleString()} </p>
            </div>
            : <></>
          }
        </div>
      </div>
    }

    </>
  )
}

// export default CardItem;