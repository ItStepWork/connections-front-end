"use client"
import Link from 'next/link';
import { useState } from "react";
import { toast } from 'react-toastify';
import { EventType } from '../../../../../../enums/all.enum';
import { PostService } from '../../../../../../services/post.service';
import CreatePost from '../../../posts/createPost/page';
import styles from './cardItem.module.scss';

// interface ICardProps {
//   howCelebrating: string;
//   avatar: string;
//   fullName: string;
//   date: string;
// }

export default function CardItem(props: any) {

  const {
    lang,
    user,
    event,
    BirthDayNow,
    local, 
  } = props;

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
    <>{event.user &&
      <div className={styles.container}>
        <Link href={`/${lang}/profile/` + event.user.id} className={styles.avatarContainer}>
          <img className=' rounded-full overflow-hidden w-20 h-20' src={event.user.avatarUrl} alt="avatar" loading="lazy" />
        </Link>
        <div className={styles.fromContainer}>
          <Link href={`/${lang}/profile/` + event.user.id} className={styles.headBlock}>
            <div className={styles.name}>
              <h4>{event.user.firstName} {event.user.lastName}</h4>
              {event.type === EventType.BirthDay && BirthDayNow
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
          </Link>
          {event.type === EventType.BirthDay && BirthDayNow
            // ? <div className={styles.sendForm}>
            //   <textarea className={styles.textarea} defaultValue={congratulations} placeholder="Write your congratulations" rows={1} onChange={(e) => changeCongrats(e)}></textarea>
            //   <button onClick={() => { sendCongrats(); setSend(true); }}
            //     className={isSend ? styles.buttonChecked : styles.button}>
            //     {isSend ? <BsFillSendCheckFill size={16} /> : <BsFillSendFill size={16} />}
            //   </button>
            // </div>
            ? <CreatePost local={local} userId={event.user.id} placeholder={"Write your congratulations"} />
            : <></>
          }
          {event.type === EventType.BirthDay && !BirthDayNow
            ? <p>Святкує свій день народження {new Date(event.date).toLocaleDateString()} </p>
            : <></>
          }
          {event.type === EventType.Meeting || event.type === EventType.Celebration
            ? <div>
              <p>{event.type} </p>
              <p>{event.name} </p>
              <p>{new Date(event.date).toLocaleString()} </p>
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