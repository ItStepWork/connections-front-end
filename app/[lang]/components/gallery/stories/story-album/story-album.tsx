"use client"
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { StoriesServices } from "../../../../../../services/stories.service";
import SelectedPhoto from "../../selectedPhoto/page";
import styles from './story-album.module.scss';

const StoryAlbum = (props:any) => {
  
  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isSelectedRemove, setIsSelectedRemove] = useState(false);

  const select = (index: number) => {
    setSelectedIndex(index);
    setIsSelected(true);
  }

  const removeAlbum = async () => {
    await StoriesServices.deleteStory(props.story.id);
    setIsSelectedRemove(false);
  }

  const removeAlbumAndPhotos = async () => {
    await StoriesServices.deleteStoryAndPhotos(props.story.id);
    setIsSelectedRemove(false);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.deleteContainer}>
          <button className='mx-1' onClick={() => { setIsSelectedRemove(true); }}><MdClose className={styles.deleteAlbum} /></button>
        </div>
        <div className={styles.labelContainer}>
          <span className={styles.title}>{props.story.name}</span>
        </div>
        <div className={styles.photos} onClick={() => { if (!isSelected) select(0) }}>
          {props.story.photos.map((photo: any, index: number) => {
            if (index < 4) return (
              <div key={index}>
                <img className={styles.photo} src={photo.url}></img>
              </div>
            );
          })}
        </div>
        <SelectedPhoto isSelected={isSelected} setIsSelected={setIsSelected} photos={props.story.photos} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}  myId={props.myId} userId={props.userId} />
        {isSelectedRemove ? (
          <div className={styles.modalContainer}>
            <div className={styles.modal}>
              <div className={styles.close}>
                <button onClick={() => { setIsSelectedRemove(false) }}><MdClose size={40} className={styles.deleteAlbum}/></button>
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={removeAlbum}>{props.local.gallery.deleteAlbum}</button>
                <button className={styles.button} onClick={removeAlbumAndPhotos}>{props.local.gallery.deleteAlbumPhoto}</button>
              </div>
            </div>
          </div>
        ) : (<></>)}
      </div>
    </>
  );
};

export default StoryAlbum;
