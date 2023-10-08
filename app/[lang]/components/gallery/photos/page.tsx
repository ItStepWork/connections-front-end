"use client"
import { useState } from 'react';
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FileFormats } from '../../../../../enums/all.enum';
import { CheckService } from '../../../../../services/check.service';
import { GalleryService } from '../../../../../services/gallery.service';
import PhotoAction from '../photoAction/page';
import SelectedPhoto from '../selectedPhoto/page';
import styles from './styles.module.scss';

export default function Photos(props: any) {

  const {
    albums,
    local,
    myId,
    photos,
    userId
  } = props;

  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);


  const change = (e: any) => {
    if (CheckService.imageFormat(e.target.files[0].name)) {
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
      {userId === myId ? (
        <div>
          <label className={styles.addPhoto}>
            <MdOutlineAddAPhoto size={50} className={styles.icon}/>
            <p>{local.gallery.addPhoto}</p>
            <input type='file' accept={FileFormats.All} onChange={change}></input>
          </label>
        </div>
      ) : (<></>)}
      {photos.map((photo: any, index: any) => {
        return (
          <div key={index} className={styles.photoActionContainer}>
            <div className={styles.wrapper}>
              <PhotoAction 
                photo={photo} 
                albums={albums} 
                local={local} 
              />
            </div>
            <img className={styles.image} src={photo.url} onClick={() => { select(index) }} />
          </div>
        );
      })}
      <SelectedPhoto 
        isSelected={isSelected} 
        setIsSelected={setIsSelected} 
        photos={photos} 
        selectedIndex={selectedIndex} 
        setSelectedIndex={setSelectedIndex} 
        myId={myId} 
        userId={userId} 
        local={local}
      />
    </div>
  );
}