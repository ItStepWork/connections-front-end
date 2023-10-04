"use client"
import { useState } from 'react';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { StoriesServices } from '../../../../../../services/stories.service';
import styles from './add-story-form.module.scss';


const AddStoryForm = (props: any) => {
  if ( !props.isVisible ) return null;

  const [files, setFiles] = useState<any[]>([]);
  const [storyName, setStoryName] = useState("");

  const changeFiles = (e: any) => {
    let array: any[] = [];
    for (const iterator of e.target.files) {
      if (iterator.name.endsWith('.jpg') || iterator.name.endsWith('.JPG') || iterator.name.endsWith('.jpeg') || iterator.name.endsWith('.png')) {
        array.push(iterator);
      }
    }
    setFiles(array);
  }

  const createStory = async () => {
    if (files.length > 0 && storyName.length > 0) {
      await StoriesServices.addStory(storyName, files);
      setStoryName("");
      setFiles([]);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.closeButton} onClick={() => props.onClose()}>X</button>
        <div className={styles.modalContainer}>
          <h2>Post Story</h2>
          <div className={styles.inputBlock}>

          <label htmlFor="img">story name.</label>
            <input type="text" 
              placeholder="Enter story name..." 
              className={styles.inputText}
              onChange={(e) => { setStoryName(e.target.value);}} 
              value={storyName} />
              
          </div>
          <label className={styles.inputBlockFile} htmlFor="img">
            <div className={styles.icon}><MdOutlineAddAPhoto size={50} /></div>
            <p>upload story images...</p>
            <input type="file" id='img'
              accept=".jpg, .jpeg, .png"
              className={styles.inputFile}
              required
              multiple
              placeholder='story images...'
              onChange={(e) => { changeFiles(e) }}
              />
            </label>
  
          <button className={styles.button} onClick={() => [createStory(), props.onClose()]}>post story</button>

        </div>
      </div>
    </div>
  )
};

export default AddStoryForm;
