"use client"
import { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineCloudUpload } from 'react-icons/ai';
import { IoMdImages } from 'react-icons/io';
import styles from './styles.module.scss';

export default function Select(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.albums.length > 0) {
      props.photo.albumId;
      let find = props.albums.find((album: any) => album.id === props.photo.albumId);
      if (find === undefined) {
        props.setSelected({ id: "", name: "Без альбома" });
      }
      else {
        props.setSelected(find);
      }
    }
  }, []);

  return (
    <>
      {props.albums.length > 0 ? (
        <>
          {isOpen ? (
            <div className="relative w-full text-start">
              <div className="flex items-center" onClick={() => { if (isOpen) setIsOpen(false) }}>
                <IoMdImages />
                <div className={styles.name}>
                  &nbsp;{props.selected?.name}
                </div>
              </div>
              <div className='h-0 m-0 p-0'>
                <div className='absolute bg-white dark:bg-dark_background'>
                  <div className='flex flex-col text-start px-1 w-40 overflow-hidden border dark:border-dark_border'>
                    <div className={styles.action + " justify-between whitespace-nowrap"} onClick={() => { if (isOpen) { props.setSelected({ id: "", name: "Без альбома" }); setIsOpen(false); } }}>
                      Без альбома
                      {props.albums.find((album: any) => album.id === props.photo.albumId) === undefined ? (<AiOutlineCheck className="mx-1" />) : (<></>)}
                    </div>
                    {props.albums.map((album: any, index: any) => {
                      return (
                        <div className={styles.action + " justify-between whitespace-nowrap"} key={index} onClick={() => { if (isOpen) { props.setSelected(album); setIsOpen(false); } }}>
                          <div className={styles.name}>
                            {album.name}
                          </div>
                          {album.id !== props.photo.albumId ? (<></>) : (<AiOutlineCheck className="mx-1" />)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full text-start">
              <div className="flex w-full justify-between">
                <div className="flex items-center" onClick={() => { if (!isOpen) setIsOpen(true) }}>
                  <IoMdImages />
                  <div className={styles.name}>
                    &nbsp;{props.selected?.name}
                  </div>
                </div>
                {props.selected?.id !== props.photo.albumId ? (<AiOutlineCloudUpload size={24} className={styles.actionRed} onClick={()=>{props.setAlbum()}} />) : (<AiOutlineCloudUpload size={24} className={styles.action} />)}
              </div>
            </div>
          )}
        </>
      ) : (<></>)}
    </>
  );
}