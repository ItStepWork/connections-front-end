import { GalleryService } from '@/services/gallery.service';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

export default function Album(props: any) {

  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    let photos = Object.entries(props.album.photos).map(([key, value]: [string, any]) => {return value});
    setPhotos(photos);
  }, []);

  return (
    <div className={styles.album}>
      <div className='m-1 flex text-center w-4/6 overflow-hidden'>
        <span className='whitespace-nowrap w-full'>{props.album.name}</span>
      </div>
      <div className={styles.photos}>
        {photos.map((photo, index) => {
          if (index < 4) return (
            <div key={index}>
              <img className={styles.photo} src={photo.url}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}