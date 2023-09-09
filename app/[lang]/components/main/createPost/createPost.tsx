import styles from "./styles.module.scss"
import { useSession } from "next-auth/react";
import { faker } from '@faker-js/faker';
import { HiPhoto } from 'react-icons/hi2'
import { BsCameraReelsFill } from 'react-icons/bs'
import { BsCalendar2EventFill } from 'react-icons/bs'
import { BsFillEmojiSmileFill } from 'react-icons/bs'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { MdLocationPin } from 'react-icons/md'
import { MdLocalOffer } from 'react-icons/md'

export const CreatePost = (props: any) => {
  const closeDialog = () => {
    //  document.querySelector("dialog")?.close();
    var dialog: any = document.getElementById("postDialog")
    dialog?.close();
  }
  const { data: session, update } = useSession();
  const options = [
    {
      label: "Для всех",
      value: '0',
    },
    {
      label: "Только я",
      value: '1',
    },
    {
      label: "Друзья",
      value: '2',
    },
  ];
  return (
    <>
      <form className={styles.dialogDiv} >
        <div className={styles.dialogDivHeader}>
          <h2 className={styles.labels}>Создать пост</h2>
          <button type="button" className={styles.closeButton} onClick={closeDialog}>
            <AiOutlineClose size={16}></AiOutlineClose>
          </button>
        </div>
        <div className={styles.dialogDivBody}>
          <div className="m-1 w-full">
            <div className={styles.topDiv}>
              {props.user?.avatarUrl
                ? <img className={styles.userIco} src={props.user.avatarUrl}></img>
                : <img className={styles.userIco} src={faker.image.avatar()}></img>
              }
              <textarea className={styles.grInput} rows={2} placeholder="Поделитесь своими мыслями..." required></textarea>
            </div>
          </div>
          <div className={styles.bottomDiv}>
            <div className={styles.roundedDiv + " bg-green-900 "}>
              <HiPhoto size={16} title="Фото" className="fill-green-500"></HiPhoto>
            </div>
            <div className={styles.roundedDiv + " bg-blue-900 "}>
              <BsCameraReelsFill title="Видео" size={16} className="fill-blue-500"></BsCameraReelsFill>
            </div>
            <div className={styles.roundedDiv + " bg-red-900 "}>
              <BsCalendar2EventFill title="Событие" size={16} className="fill-red-500"></BsCalendar2EventFill>
            </div>
            <div className={styles.roundedDiv + " bg-yellow-900 "}>
              <BsFillEmojiSmileFill title="Чувство/Деятельность" size={16} className="fill-yellow-500"></BsFillEmojiSmileFill>
            </div>
            <div className={styles.roundedDiv + " bg-green-900 "}>
              <MdLocationPin title="Локация" className="fill-gray-500" size={16}></MdLocationPin>
            </div>
            <div className={styles.roundedDiv + " bg-blue-900 "}>
              <MdLocalOffer title="Отметить людей" className="fill-blue-500" size={16}></MdLocalOffer>
            </div>
          </div>
          <div className={styles.checkDiv}>
            <select
              className={styles.select}
              id="audience"
              key={session?.user?.id}
            >
              {options.map((option, index) => (
                <option key={index} value={option.value} typeof="number">{option.label}</option>
              ))}
            </select>
          </div>
        </div>


        <div className={styles.dialogDivFooter}>
          <div className={styles.redButton}>
            <BsFillCameraVideoFill className="m-1"></BsFillCameraVideoFill>
            <a>Видео</a>
          </div>
          <button className={styles.greenButton}>Опубликовать</button>
        </div>
      </form>
    </>
  )
}