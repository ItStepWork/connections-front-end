"use client"
import { useState } from "react";
import { BsPencilFill, BsXLg } from 'react-icons/bs';
import { PiUserCircleBold, PiUserFocusBold } from 'react-icons/pi';
import { GalleryService } from '../../../../../../services/gallery.service';
import { GroupService } from '../../../../../../services/group.service';
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
    props.getPhotos();
  }

  const removePhoto = async () => {
    await GroupService.removePhoto(props.group.id, props.photo.id);
    props.getPhotos();
  }

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={() => { if (!isOpen) setIsOpen(true) }} onFocus={() => { if (!isOpen) setIsOpen(true) }} onBlur={() => setIsOpen(false)} className='rounded-full overflow-hidden'>
          <BsPencilFill size={40} {...isOpen ? { className: "bg-button_blue_BG p-3 fill-white" } : { className: "bg-button_blue_opacity p-3 fill-button_blue_BG" }} />

          {isOpen &&
            <div className={styles.dropMenu}>
              {/* <Select albums={props.albums} selected={selected} setSelected={setSelected} photo={props.photo} setAlbum={setAlbum} /> */}
              {/* <a className={styles.action}  href={props.photo.url} download><BsDownload />&nbsp;Скачать</a> */}
              <div className={styles.action} onClick={setAvatar}><PiUserCircleBold />&nbsp;Сделать аватаром</div>
              <div className={styles.action} onClick={setBackground}><PiUserFocusBold />&nbsp;Сделать обложкой</div>
              <hr className={styles.hr} />
              <div className={styles.actionDelete} onClick={removePhoto}><BsXLg />&nbsp;Удалить</div>
            </div>
          }
        </button>
      </div>
    </>
  )
}