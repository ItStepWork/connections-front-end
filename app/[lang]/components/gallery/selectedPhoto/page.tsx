import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import InfoPhoto from '../infoPhoto/page';
import styles from './styles.module.scss';

export default function SelectedPhoto(props: any) {

  const {
    isSelected,
    myId,
    photos,
    selectedIndex,
    setIsSelected,
    setSelectedIndex,
    userId,
    local
  } = props;

  return (
    <>
      {isSelected ? (
        <div className={styles.container}>
          <div className={styles.closeContainer}>
            <button onClick={() => { setIsSelected(false) }}><MdClose size={40} /></button>
          </div>
          <div className={styles.photoContainer}>
            <button className={styles.buttonLeft} onClick={() => { if ((selectedIndex - 1) >= 0) setSelectedIndex(selectedIndex - 1) }}><FaChevronLeft size={40} /></button>
            {photos[selectedIndex] ? (
              <div className={styles.modal}>

                <div className={styles.wrapper}>
                  <img className={styles.img} src={photos[selectedIndex].url} />
                  <div className={styles.infoPhotoContainer}>
                    <InfoPhoto 
                      photo={photos[selectedIndex]} 
                      myId={myId} 
                      userId={userId} 
                      local={local}
                    />
                  </div>
                </div>
              </div>
            ) : (<></>)}
            <button className={styles.buttonRight} onClick={() => { if (photos.length > (selectedIndex + 1)) setSelectedIndex(selectedIndex + 1) }}><FaChevronRight size={40} /></button>
          </div>
        </div>
      ) : (<></>)}
    </>
  );
}