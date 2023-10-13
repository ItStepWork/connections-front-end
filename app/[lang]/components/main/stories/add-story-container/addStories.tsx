'use client'
import { Fragment, useState } from "react"
import { MdOutlineAddAPhoto } from "react-icons/md"
import AddStoryForm from "../add-story-form/add-story-form"
import styles from "./addStories.module.scss"

export const AddStories = (props : any) => {

  const {
    local
  } = props

  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <div className={styles.container}>
        <Fragment>
          <div className={styles.postStoryBlock} onClick={() => setShowModal(true)}>
            <div className={styles.plusButton}>
              <MdOutlineAddAPhoto size={30} onClick={() => setShowModal(true)}/>
            </div>
            <p>{local.stories.add}</p>
            <p>{local.stories.story}</p>
          </div>
          <AddStoryForm 
            local={local} 
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            />
        </Fragment>
      </div>
    </>
  )
}