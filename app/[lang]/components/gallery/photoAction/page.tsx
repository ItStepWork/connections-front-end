"use client"
import { useState } from "react";
import { BsPencilFill, BsXLg } from 'react-icons/bs';
import { PiUserCircleBold, PiUserFocusBold } from 'react-icons/pi';
import { GalleryService } from '../../../../../services/gallery.service';
import Select from '../select/page';
import styles from './styles.module.scss';

export default function PhotoAction(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<any>({ id: "", name: "Без альбома" });

  const setAvatar = async () => {
    await GalleryService.setAvatar(props.photo.url);
  }

  const setBackground = async () => {
    await GalleryService.setBackground(props.photo.url);
  }
  
  const setAlbum = async () => {
    await GalleryService.setAlbum(props.photo.id, selected.id);
    props.get();
  }

  const removePhoto = async () => {
    await GalleryService.removePhoto(props.photo.id);
    props.get();
  }

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={() => { if (!isOpen) setIsOpen(true) }} onFocus={() => { if (!isOpen) setIsOpen(true) }} onBlur={() => setIsOpen(false)} className='rounded-full overflow-hidden'>
          <BsPencilFill size={40} {...isOpen ? { className: "bg-button_blue_BG p-3 fill-white" } : { className: "bg-button_blue_opacity p-3 fill-button_blue_BG" }} />

          {isOpen &&
            <div className={styles.dropMenu}>
              <Select albums={props.albums} selected={selected} setSelected={setSelected} photo={props.photo} setAlbum={setAlbum}/>
              {/* <a className={styles.action}  href={props.photo.url} download><BsDownload />&nbsp;Скачать</a> */}
              <div className={styles.action} onClick={setAvatar}><PiUserCircleBold />&nbsp;{props.local.gallery.action.toAvatar}</div>
              <div className={styles.action} onClick={setBackground}><PiUserFocusBold />&nbsp;{props.local.gallery.action.toBackground}</div>
              <hr className={styles.hr} />
              <div className={styles.actionDelete} onClick={removePhoto}><BsXLg />&nbsp;{props.local.gallery.action.delete}</div>
            </div>
          }
        </button>
      </div>
    </>
  )
}