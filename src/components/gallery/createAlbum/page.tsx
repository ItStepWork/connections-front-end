import styles from './styles.module.scss'
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { BsFillSendFill } from 'react-icons/bs';
import { LiaPhotoVideoSolid } from 'react-icons/lia';
import { useState } from "react";
import { GalleryService } from '@/services/gallery.service';

export function CreateAlbum(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [text, setText] = useState("");

  const changeFiles = (e: any) => {
    let array: any[] = [];
    for (const iterator of e.target.files) {
      if (iterator.name.endsWith('.jpg') || iterator.name.endsWith('.jpeg') || iterator.name.endsWith('.png')) {
        array.push(iterator);
      }
    }
    setFiles(array);
  }

  const createAlbum = async () => {
    if(files.length > 0 && text.length > 0){
      await GalleryService.addAlbum(text, files);
    }
    setText("");
    setFiles([]);
  }

  return (
    <div>
      <button className={styles.button} onClick={() => { if (!isOpen) setIsOpen(true); }}>
        <AiOutlinePlus />&nbsp; Создать альбом
      </button>

      <div {...isOpen ? { className: styles.createAlbum + " visible z-50" } : { className: styles.createAlbum + " invisible z-50" }}>
        <div className={styles.createAlbumContainer}>
          <div className={styles.createAlbumHeader}>
            <h2>Новый альбом</h2>
            <button onClick={() => setIsOpen(false)}>
              <IoMdClose size={26} className={styles.buttonClose} />
            </button>
          </div>
          <hr className={styles.horizontalHr} />
          <div className={styles.createAlbumContent}>
            <div className="flex">
              <span className={styles.icon}>
                <MdDriveFileRenameOutline size={20} className="fill-white"/>
              </span>
              <input type="text" className={styles.input} placeholder="Введите название" onChange={(e) => { setText(e.target.value); }} value={text} />
              
              <span className={styles.iconGallery}>
                <label className='cursor-pointer'>
                  <LiaPhotoVideoSolid size={20}  className="fill-white"/>
                  <input type='file' multiple className='hidden' onChange={(e) => { changeFiles(e) }}></input>
                </label>
              </span>
              
              <span className={styles.iconSend} onClick={createAlbum}>
                <BsFillSendFill size={20}  className="fill-white"/>
              </span>
            </div>
            <div className='flex flex-wrap overflow-y-auto'>

            {files.length > 0 ? (<>
              {files.map((file: any, index: number) => {
                return (
                  <div key={index} className={styles.imageFile}>
                    <img className='max-h-full max-w-full' src={URL.createObjectURL(file)}></img>
                  </div>
                );
              })}
            </>) : (<></>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}