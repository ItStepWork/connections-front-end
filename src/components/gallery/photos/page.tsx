import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { MdOutlineAddAPhoto } from "react-icons/md";
import { PhotoAction } from '../photoAction/page';
import { GalleryService } from '@/services/gallery.service';
import SelectedPhoto from '../selectedPhoto/page';

export default function Photos(props: any) {

  const [photos, setPhotos] = useState<any[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  
  useEffect(() => {
    get();
  }, []);

  const change = (e: any) => {
    if (e.target.files[0].name.endsWith('.jpg') || e.target.files[0].name.endsWith('.jpeg') || e.target.files[0].name.endsWith('.png')) {
      add(e.target.files[0]);
    }
  }

  const add = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    await GalleryService.addPhoto(formData);
    get();
  }

  const get = async () => {
    let result = await GalleryService.getPhotos();
    setPhotos(result);
  }

  const select =(index: number)=>{
    setSelectedIndex(index);
    setIsSelected(true);
  }

  return (
    <div className={styles.container}>
      <div>
      <label className={styles.addPhoto}>
        <MdOutlineAddAPhoto size={50} className="fill-buttonBlue" />
        <p className='text-center'>Добавить фото</p>
        <input type='file' className='hidden' onChange={change}></input>
      </label>
      </div>
      {photos.map((photo: any, index) => {
        return (
          <div key={index} className='relative'>
            <div className='absolute right-0 bottom-0'>
              <PhotoAction get={get} photo={photo}/>
            </div>
            <img className={styles.image} src={photo.url} onClick={()=>{select(index)}}/>
          </div>
        );
      })}
      <SelectedPhoto isSelected={isSelected} setIsSelected={setIsSelected} photos={photos} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} user={props.user} get={get}/>
    </div>
  );
}