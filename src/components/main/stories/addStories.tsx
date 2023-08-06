import { BsPlusLg } from "react-icons/bs"
import styles from "./addStories.module.scss"

export const AddStories = () => {

  return (
    <>
      <div className={styles.container}>
          <div className={styles.postStoryBlock}>
            <div className={styles.plusButton}>
              <BsPlusLg size={20}/>
            </div>
            <p>Добавить </p>
            <p>историю </p>
          </div>
      </div>
    </>
  )
}