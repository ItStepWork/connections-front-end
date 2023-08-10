import styles from "./styles.module.scss"
import { faker } from '@faker-js/faker';
import { BsImages } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'

export const PostPhoto = () => {
  const closeDialog = () => { document.querySelector("dialog")?.close(); }
  return (
    <>
      <form className={styles.dialogDiv} >
        <div className={styles.dialogDivHeader}>
          <h2 className={styles.labels}>Add post photo</h2>
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
          <label className={styles.inputPhoto}>
            <BsImages className="fill-gray-600 mt-5" size={50}></BsImages>
            <a>Drag here or click to upload photo.</a>
            <input type="file" className="hidden"></input>
          </label>
        </div>
        <div className={styles.dialogDivFooter}>
          <button className={styles.redButton} onClick={closeDialog}>Cancel</button>
          <button className={styles.greenButton}>Post</button>
        </div>
      </form>
    </>
  )
}