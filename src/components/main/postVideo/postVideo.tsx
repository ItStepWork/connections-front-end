import styles from "./styles.module.scss"
import { faker } from '@faker-js/faker';
import { BsCameraReels } from 'react-icons/bs'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'

export const PostVideo = () => {
  const closeDialog = () => { document.querySelector("dialog")?.close(); }
  return (
    <>
      <form className={styles.dialogDiv} >
        <div className={styles.dialogDivHeader}>
          <h2 className={styles.labels}>Add post video</h2>
          <button type="button" className={styles.closeButton} onClick={closeDialog}>
            <AiOutlineClose size={16}></AiOutlineClose>
          </button>
        </div>
        <div className={styles.dialogDivBody}>
          <div className="m-1 w-full">
            <div className={styles.topDiv}>
              <img className={styles.userIco} src={faker.image.avatar()}></img>
              <textarea className={styles.grInput} rows={2} placeholder="Share your thougts..." required></textarea>
            </div>
          </div>
          <a>Upload attachment</a>
          <label className={styles.inputPhoto}>
            <BsCameraReels className="fill-gray-600 mt-5" size={50}></BsCameraReels>
            <a>Drag here or click to upload video.</a>
            <input type="file" className="hidden"></input>
          </label>
        </div>
        <div className={styles.dialogDivFooter}>
          <div className={styles.redButton}>
            <BsFillCameraVideoFill className="m-1"></BsFillCameraVideoFill>
            <a>Live video</a>
          </div>
          <button className={styles.greenButton}>Post</button>
        </div>
      </form>
    </>
  )
}