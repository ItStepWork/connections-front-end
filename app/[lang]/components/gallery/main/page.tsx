"use client"

import { useEffect, useState } from 'react';
import { GalleryService } from '../../../../../services/gallery.service';
import { StoriesServices } from '../../../../../services/stories.service';
import Albums from "../albums/page";
import CreateAlbum from '../createAlbum/page';
import Photos from "../photos/page";
import StoriesAlbums from '../stories/page';
import styles from './styles.module.scss';

export default function Gallery(props: any) {

  const [component, setComponent] = useState("photos");
  const [albums, setAlbums] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);

  const get = async () => {
    let result1 = await GalleryService.getAlbums(props.userId);
    setAlbums(result1);
    
    let result2 = await GalleryService.getPhotos(props.userId);
    setPhotos(result2);

    let result3 = await StoriesServices.getStories(props.userId);
    setStories(result3);
  }
  
  useEffect(() => {
    get();
  }, []);

  const render = () => {
    if(component === "photos"){
      return (<Photos myId={props.myId} userId={props.userId} get={get} photos={photos} albums={albums} local={props.local}/>);
    }
    else if(component === "albums"){
      return (<Albums myId={props.myId} userId={props.userId} albums={albums} local={props.local} get={get}/>);
    }
    else if(component === "stories"){
      return (<StoriesAlbums myId={props.myId} userId={props.userId} stories={stories} local={props.local} get={get}/>);
    }
    else {
      return(<></>);
    }
  }

  return (
    <div className={styles.container}>
      <div className="flex justify-between items-center">
        <h2>{props.local.gallery.title}</h2>
        {props.userId === props.myId?(<CreateAlbum get={get} local={props.local}/>):(<></>)}
      </div>
      <div className={styles.nav}>
        <div {...component === "photos" ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === "photos" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("photos") }}>{props.local.gallery.photo}</button>
        </div>
        <div {...component === "albums" ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === "albums" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("albums") }}>{props.local.gallery.album}</button>
        </div>
        <div {...component === "stories" ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === "stories" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("stories") }}>{props.local.gallery.stories}</button>
        </div>
      </div>
      {render()}
    </div>
  )
}