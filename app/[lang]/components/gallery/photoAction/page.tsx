"use client"
import { useState } from "react";
import { BsPencilFill, BsXLg } from 'react-icons/bs';
import { PiUserCircleBold, PiUserFocusBold } from 'react-icons/pi';
import { GalleryService } from '../../../../../services/gallery.service';
import Select from '../select/page';
import styles from './styles.module.scss';

export default function PhotoAction(props: any) {

  const {
    photo,
    albums,
    local
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<any>({ id: "", name: local.gallery.action.noAlbum });

  const setAvatar = async () => {
    setIsOpen(false);
    await GalleryService.setAvatar(photo.url);
  }

  const setBackground = async () => {
    setIsOpen(false);
    await GalleryService.setBackground(photo.url);
  }
  
  const setAlbum = async () => {
    setIsOpen(false);
    await GalleryService.setAlbum(photo.id, selected.id);
  }

  const removePhoto = async () => {
    setIsOpen(false);
    await GalleryService.removePhoto(photo.id);
  }

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={() => { if (!isOpen) setIsOpen(true) }} onFocus={() => { if (!isOpen) setIsOpen(true) }} onBlur={() => setIsOpen(false)} className='rounded-full overflow-hidden'>
          <BsPencilFill size={40} {...isOpen ? { className: "bg-button_blue_BG p-3 fill-white" } : { className: "bg-button_blue_opacity p-3 fill-button_blue_BG" }} />

          {isOpen &&
            <div className={styles.dropMenu}>
              <Select 
                albums={albums} 
                selected={selected} 
                setSelected={setSelected} 
                photo={photo} 
                setAlbum={setAlbum}
                local={local}
              />
              <div 
                className={styles.action} 
                onClick={setAvatar}>
                <PiUserCircleBold />&nbsp;{local.gallery.action.toAvatar}
              </div>
              <div 
                className={styles.action} 
                onClick={setBackground}>
                <PiUserFocusBold />&nbsp;{local.gallery.action.toBackground}
              </div>
              <hr className={styles.hr} />
              <div 
                className={styles.actionDelete} 
                onClick={removePhoto}>
                <BsXLg />&nbsp;{local.gallery.action.delete}
                </div>
            </div>
          }
        </button>
      </div>
    </>
  )
}