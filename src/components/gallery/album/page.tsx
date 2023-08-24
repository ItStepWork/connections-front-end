import { GalleryService } from '@/services/gallery.service';
import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import SelectedPhoto from '../selectedPhoto/page';
import styles from './styles.module.scss';

export default function Album(props: any) {

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
    let array = await GalleryService.getAlbumPhotos(props.userId, props.album.id);
    setPhotos(array);
  }

  const removeAlbum = async () => {
    await GalleryService.removeAlbum(props.album.id);
    setIsSelectedRemove(false);
    props.get();
  }

  const removeAlbumAndPhotos = async () => {
    await GalleryService.removeAlbumAndPhotos(props.album.id);
    setIsSelectedRemove(false);
    props.get();
  }

  return (
    <div className={styles.album}>
      <div className=' absolute flex w-full justify-end items-start'>
        <button className='mx-1' onClick={() => { setIsSelectedRemove(true); }}><MdClose className="hover:fill-red-500 w-6 h-6" /></button>
      </div>
      <div className='m-1 flex text-center w-4/6 overflow-hidden'>
        <span className='whitespace-nowrap w-full'>{props.album.name}</span>
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
      <SelectedPhoto isSelected={isSelected} setIsSelected={setIsSelected} photos={photos} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} user={props.user} get={get} />
      {isSelectedRemove ? (
        <div className='fixed z-50 flex flex-col justify-center items-center left-0 top-0 h-screen w-full p-5 bg-black bg-opacity-70 '>
          <div className='relative flex flex-col w-72 h-60 border rounded-lg bg-light_background dark:bg-dark_background border-light_border dark:border-dark_border'>
            <div className='absolute right-0'>
              <button onClick={() => { setIsSelectedRemove(false) }}><MdClose size={40} className="hover:fill-red-500"/></button>
            </div>
            <div className='flex flex-col h-full justify-center items-center text-white'>
              <button className={styles.button} onClick={removeAlbum}>Удалить только альбом</button>
              <button className={styles.button} onClick={removeAlbumAndPhotos}>Удалить альбом вместе с фотографиями</button>
            </div>
          </div>
        </div>
      ) : (<></>)}
    </div>
  );
}