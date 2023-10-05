import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { StoriesServices } from "../../../../../../services/stories.service";
import SelectedPhoto from "../../selectedPhoto/page";
import styles from './story-album.module.scss';

const StoryAlbum = (props:any) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isSelectedRemove, setIsSelectedRemove] = useState(false);

  const select = (index: number) => {
    setSelectedIndex(index);
    setIsSelected(true);
  }

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    let array = await StoriesServices.getStoryPhotos(props.userId, props.story.id);
    setPhotos(array);
  }

  const removeAlbum = async () => {
    await StoriesServices.deleteStory(props.story.id);
    setIsSelectedRemove(false);
    props.get();
  }

  const removeAlbumAndPhotos = async () => {
    await StoriesServices.deleteStoryAndPhotos(props.story.id);
    setIsSelectedRemove(false);
    props.get();
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
          {photos.map((photo, index) => {
            if (index < 4) return (
              <div key={index}>
                <img className={styles.photo} src={photo.url}></img>
              </div>
            );
          })}
        </div>
        <SelectedPhoto isSelected={isSelected} setIsSelected={setIsSelected} photos={photos} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}  myId={props.myId} userId={props.userId} get={get} />
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
