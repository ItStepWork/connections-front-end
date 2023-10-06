"use client"

import { useEffect, useState } from 'react';
import { GalleryService } from '../../../../../services/gallery.service';
import { StoriesServices } from '../../../../../services/stories.service';
import Albums from "../albums/page";
import CreateAlbum from '../createAlbum/page';
import Photos from "../photos/page";
import StoriesAlbums from '../stories/page';
import styles from './styles.module.scss';
import { SubscriptionService } from '../../../../../services/subscription.service';
import { ComponentName } from '../../../../../enums/all.enum';

export default function Gallery(props: any) {

  const [component, setComponent] = useState<ComponentName>(ComponentName.Photos);
  const [albums, setAlbums] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);

  const getAlbums = async ()=>{
    let result = await GalleryService.getAlbums(props.userId);
    setAlbums(result);
  }

  const getPhotos = async () => {
    let result = await GalleryService.getPhotos(props.userId);
    setPhotos(result);
  }

  const getStories = async () => {
    let result = await StoriesServices.getStories(props.userId);
    setStories(result);
  }

  const get = async () => {
    getAlbums();
    getPhotos();
    getStories();
  }
  
  useEffect(() => {
    get();
    return SubscriptionService.subscribeToChannels(props.session.user.accessToken, [
      { path: `Subscription/SubscribeToAlbumsUpdates?id=${props.userId}`, func: ()=>{ getAlbums(); } },
      { path: `Subscription/SubscribeToPhotosUpdates?id=${props.userId}`, func: ()=>{ get(); } },
      { path: `Subscription/SubscribeToStoriesUpdates?id=${props.userId}`, func: ()=>{ getStories(); } },
    ])
  }, []);

  const render = () => {
    if(component === ComponentName.Photos){
      return (<Photos myId={props.myId} userId={props.userId} photos={photos} albums={albums} local={props.local}/>);
    }
    else if(component === ComponentName.Albums){
      return (<Albums myId={props.myId} userId={props.userId} albums={albums} local={props.local}/>);
    }
    else if(component === ComponentName.Stories){
      return (<StoriesAlbums myId={props.myId} userId={props.userId} stories={stories} local={props.local}/>);
    }
    else {
      return(<></>);
    }
  }

  return (
    <div className={styles.container}>
      <div className="flex justify-between items-center">
        <h2>{props.local.gallery.title}</h2>
        {props.userId === props.myId?(<CreateAlbum local={props.local}/>):(<></>)}
      </div>
      <div className={styles.nav}>
        <div {...component === ComponentName.Photos ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === ComponentName.Photos ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Photos) }}>{props.local.gallery.photo}</button>
        </div>
        <div {...component === ComponentName.Albums ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === ComponentName.Albums ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Albums) }}>{props.local.gallery.album}</button>
        </div>
        <div {...component === ComponentName.Stories ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === ComponentName.Stories ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Stories) }}>{props.local.gallery.stories}</button>
        </div>
      </div>
      {render()}
    </div>
  )
}