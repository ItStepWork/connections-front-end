"use client"
import { useState } from 'react';
import { MdOutlineAddAPhoto } from "react-icons/md";
import { GalleryService } from '../../../../../services/gallery.service';
import PhotoAction from '../photoAction/page';
import SelectedPhoto from '../selectedPhoto/page';
import styles from './styles.module.scss';

export default function Photos(props: any) {

  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);


  const change = (e: any) => {
    if (e.target.files[0].name.endsWith('.jpg') || e.target.files[0].name.endsWith('.jpeg') || e.target.files[0].name.endsWith('.png')) {
      add(e.target.files[0]);
    }
  }

  const add = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    await GalleryService.addPhoto(formData);
  }


  const select = (index: number) => {
    setSelectedIndex(index);
    setIsSelected(true);
  }

  return (
    <div className={styles.container}>
      {props.userId === props.myId ? (
        <div>
          <label className={styles.addPhoto}>
            <MdOutlineAddAPhoto size={50} className="fill-button_blue_BG" />
            <p className='text-center'>{props.local.gallery.addPhoto}</p>
            <input type='file' className='hidden' onChange={change}></input>
          </label>
        </div>
      ) : (<></>)}
      {props.photos.map((photo: any, index: any) => {
        return (
          <div key={index} className='relative'>
            <div className='absolute right-0 bottom-0'>
              <PhotoAction photo={photo} albums={props.albums} local={props.local}/>
            </div>
            <img className={styles.image} src={photo.url} onClick={() => { select(index) }} />
          </div>
        );
      })}
      <SelectedPhoto isSelected={isSelected} setIsSelected={setIsSelected} photos={props.photos} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} myId={props.myId} userId={props.userId} />
    </div>
  );
}