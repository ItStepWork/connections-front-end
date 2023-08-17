import Link from 'next/link';
import styles from './styles.module.scss'
import { useState } from "react";
import { BsPencilFill, BsDownload, BsXLg } from 'react-icons/bs'
import { PiUserFocusBold, PiUserCircleBold } from 'react-icons/pi'
import { GalleryService } from '@/services/gallery.service';
import Select from '../select/page';

export function PhotoAction(props: any) {
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
          <BsPencilFill size={40} {...isOpen ? { className: "bg-buttonBlue p-3 fill-white" } : { className: "bg-buttonBlueOpacity p-3 fill-buttonBlue" }} />

          {isOpen &&
            <div className={styles.dropMenu}>
              <Select albums={props.albums} selected={selected} setSelected={setSelected} photo={props.photo} setAlbum={setAlbum}/>
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