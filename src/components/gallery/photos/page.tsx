import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { PhotoAction } from '../photoAction/page';
import { InfoPhoto } from '../infoPhoto/page';
import { GalleryService } from '@/services/gallery.service';

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
      {isSelected?(
      <div className='fixed z-50 flex flex-col left-0 top-0 h-screen w-full p-5 bg-black bg-opacity-70 '>
        <div className='flex h-1/5 w-full justify-end items-start'>
          <button onClick={()=>{setIsSelected(false)}}><MdClose size={40}/></button>
        </div>
        <div className='flex h-3/5 w-full justify-between items-center'>
          <button className='w-1/12' onClick={()=>{if((selectedIndex - 1) >= 0) setSelectedIndex(selectedIndex - 1)}}><FaChevronLeft size={40}/></button>
          {photos[selectedIndex]?(<div className='w-10/12 h-full flex items-center justify-center'><InfoPhoto photo={photos[selectedIndex]} myId={props.user.id} userId={props.user.id} get={get}/><img className='max-h-full' src={photos[selectedIndex].url}/></div>):(<></>)}
          <button className='w-1/12 flex justify-end' onClick={()=>{if(photos.length > (selectedIndex + 1)) setSelectedIndex(selectedIndex + 1)}}><FaChevronRight size={40}/></button>
        </div>
      </div>
      ):(<></>)}
    </div>
  );
}