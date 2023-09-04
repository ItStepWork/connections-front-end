"use client"
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { GalleryService } from '../../../../../services/gallery.service';
import Albums from "../albums/page";
import CreateAlbum from '../createAlbum/page';
import Photos from "../photos/page";
import styles from './styles.module.scss';

export default function Gallery(props: any) {

  const [component, setComponent] = useState("photos");
  const [user, setUser] = useState<any>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const getUser = async()=>{
    const session = await getSession();
    setUser(session?.user)
    get();
  }

  const get = async () => {
    let result1 = await GalleryService.getAlbums(props.userId);
    setAlbums(result1);
    
    let result2 = await GalleryService.getPhotos(props.userId);
    setPhotos(result2);
  }
  
  useEffect(() => {
    getUser();
  }, []);

  const render = () => {
    if(component === "photos"){
      return (<Photos myId={props.myId} userId={props.userId} get={get} photos={photos} albums={albums}/>);
    }
    else if(component === "albums"){
      return (<Albums myId={props.myId} userId={props.userId} albums={albums}  get={get}/>);
    }
    else {
      return(<></>);
    }
  }

  return (
    <div className={styles.container}>
      <div className="flex justify-between items-center">
        <h2>Галерея</h2>
        {props.userId === props.myId?(<CreateAlbum get={get}/>):(<></>)}
      </div>
      <div className={styles.nav}>
        <div {...component === "photos" ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === "photos" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("photos") }}>Фотографии</button>
        </div>
        <div {...component === "albums" ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === "albums" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("albums") }}>Альбомы</button>
        </div>
      </div>
      {render()}
    </div>
  )
}