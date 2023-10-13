"use client"
import { useState } from 'react';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { FileFormats } from '../../../../../../enums/all.enum';
import { CheckService } from '../../../../../../services/check.service';
import { StoriesServices } from '../../../../../../services/stories.service';
import styles from './add-story-form.module.scss';


const AddStoryForm = (props: any) => {

  const {
    local,
    isVisible,
    onClose
  } = props;

  if ( !isVisible ) return null;

  const [files, setFiles] = useState<any[]>([]);
  const [storyName, setStoryName] = useState("");

  const changeFiles = (e: any) => {
    let array: any[] = [];
    for (const iterator of e.target.files) {
      if (CheckService.imageFormat(iterator.name)){
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
        <button className={styles.closeButton} onClick={() => onClose()}>X</button>
        <div className={styles.modalContainer}>
          <h2>{local.stories.title}</h2>
          <div className={styles.inputBlock}>

          <label htmlFor="img">{local.stories.name}</label>
            <input type="text" 
              placeholder={local.stories.placeholder}
              className={styles.inputText}
              onChange={(e) => { setStoryName(e.target.value);}} 
              value={storyName} />
              
          </div>
          <label className={styles.inputBlockFile} htmlFor="img">
            <div className={styles.icon}><MdOutlineAddAPhoto size={50} /></div>
            <p>{local.stories.upload}</p>
            <input type="file" id='img'
              accept={FileFormats.All}
              className={styles.inputFile}
              required
              multiple
              onChange={(e) => { changeFiles(e) }}
              />
            </label>
  
          <button className={styles.button} onClick={() => [createStory(), onClose()]}>{local.stories.post}</button>

        </div>
      </div>
    </div>
  )
};

export default AddStoryForm;
