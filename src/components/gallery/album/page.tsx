import { GalleryService } from '@/services/gallery.service';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import SelectedPhoto from '../selectedPhoto/page';

export default function Album(props: any) {

  const [photos, setPhotos] = useState<any[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  
  const select =(index: number)=>{
    setSelectedIndex(index);
    setIsSelected(true);
  }

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    let array = await GalleryService.getAlbumPhotos(props.user.id, props.album.id);
    setPhotos(array);
  }

  return (
    <div className={styles.album} onClick={()=>{if(!isSelected)select(0)}}>
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
      <SelectedPhoto isSelected={isSelected} setIsSelected={setIsSelected} photos={photos} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} user={props.user} get={get}/>
    </div>
  );
}