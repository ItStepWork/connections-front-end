"use client"
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { StoriesServices } from "../../../../../../services/stories.service";
import SelectedPhoto from "../../selectedPhoto/page";
import styles from './story-album.module.scss';

const StoryAlbum = (props:any) => {
  
  const {
    story,
    local,
    myId,
    userId
  } = props;

  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isSelectedRemove, setIsSelectedRemove] = useState(false);

  const select = (index: number) => {
    setSelectedIndex(index);
    setIsSelected(true);
  }

  const removeAlbum = async () => {
    await StoriesServices.deleteStory(story.id);
    setIsSelectedRemove(false);
  }

  const removeAlbumAndPhotos = async () => {
    await StoriesServices.deleteStoryAndPhotos(story.id);
    setIsSelectedRemove(false);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.deleteContainer}>
          <button className='mx-1' onClick={() => { setIsSelectedRemove(true); }}><MdClose className={styles.deleteAlbum} /></button>
        </div>
        <div className={styles.labelContainer}>
          <span className={styles.title}>{story.name}</span>
        </div>
        <div className={styles.photos} onClick={() => { if (!isSelected) select(0) }}>
          {story.photos.map((photo: any, index: number) => {
            if (index < 4) return (
              <div key={index}>
                <img className={styles.photo} src={photo.url}></img>
              </div>
            );
          })}
        </div>
        <SelectedPhoto 
          isSelected={isSelected} 
          setIsSelected={setIsSelected}
          photos={story.photos} 
          electedIndex={selectedIndex} 
          setSelectedIndex={setSelectedIndex} 
          myId={myId} 
          userId={userId} 
          local={local}
        />
        {isSelectedRemove ? (
          <div className={styles.modalContainer}>
            <div className={styles.modal}>
              <div className={styles.close}>
                <button onClick={() => { setIsSelectedRemove(false) }}><MdClose size={40} className={styles.deleteAlbum}/></button>
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={removeAlbum}>{local.gallery.deleteAlbum}</button>
                <button className={styles.button} onClick={removeAlbumAndPhotos}>{local.gallery.deleteAlbumPhoto}</button>
              </div>
            </div>
          </div>
        ) : (<></>)}
      </div>
    </>
  );
};

export default StoryAlbum;
