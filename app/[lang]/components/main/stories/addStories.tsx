import { BsPlusLg } from "react-icons/bs"
import styles from "./addStories.module.scss"

export const AddStories = (props : any) => {

  return (
    <>
      <div className={styles.container}>
          <div className={styles.postStoryBlock}>
            <div className={styles.plusButton}>
              <BsPlusLg size={20}/>
            </div>
            <p>{props.local.stories.add}</p>
            <p>{props.local.stories.story}</p>
          </div>
      </div>
    </>
  )
}