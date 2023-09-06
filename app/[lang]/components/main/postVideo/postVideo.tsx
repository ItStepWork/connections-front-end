import styles from "./styles.module.scss"
import { faker } from '@faker-js/faker';
import { BsCameraReels } from 'react-icons/bs'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'

export const PostVideo = (props: any) => {
  const closeDialog = () => {
    // document.querySelector("dialog")?.close();
    var dialog: any = document.getElementById("postDialog")
    dialog?.close();
  }
  return (
    <>
      <form className={styles.dialogDiv} >
        <div className={styles.dialogDivHeader}>
          <h2 className={styles.labels}>Публикация видео</h2>
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
          <a>Загрузить вложение</a>
          <label className={styles.inputPhoto}>
            <BsCameraReels className="fill-gray-300 dark:fill-gray-700 mt-5" size={50}></BsCameraReels>
            <a className="opacity-50">Перетащите сюда или нажмите, чтобы загрузить видео.</a>
            <input type="file" accept="video/mp4,video/x-m4v,video/*/" className="hidden"></input>
          </label>
        </div>
        <div className={styles.dialogDivFooter}>
          <div className={styles.redButton}>
            <BsFillCameraVideoFill className="m-1"></BsFillCameraVideoFill>
            <a>Запись</a>
          </div>
          <button className={styles.greenButton}>Опубликовать</button>
        </div>
      </form>
    </>
  )
}