"use client"

import { useEffect, useState } from 'react';
import { ComponentName } from '../../../../../enums/all.enum';
import { GalleryService } from '../../../../../services/gallery.service';
import { StoriesServices } from '../../../../../services/stories.service';
import { SubscriptionService } from '../../../../../services/subscription.service';
import Albums from "../albums/page";
import CreateAlbum from '../createAlbum/page';
import Photos from "../photos/page";
import StoriesAlbums from '../stories/page';
import styles from './styles.module.scss';

export default function Gallery(props: any) {

  const {
    local,
    myId,
    session,
    userId
  } = props

  const [component, setComponent] = useState<ComponentName>(ComponentName.Photos);
  const [albums, setAlbums] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);

  const getAlbums = async ()=>{
    let result = await GalleryService.getAlbums(userId);
    setAlbums(result);
  }

  const getPhotos = async () => {
    let result = await GalleryService.getPhotos(userId);
    setPhotos(result);
  }

  const getStories = async () => {
    let result = await StoriesServices.getStories(userId);
    setStories(result);
  }

  const get = async () => {
    getAlbums();
    getPhotos();
    getStories();
  }
  
  useEffect(() => {
    get();
    return SubscriptionService.subscribeToChannels(session.user.accessToken, [
      { path: `Subscription/SubscribeToAlbumsUpdates?id=${userId}`, func: ()=>{ getAlbums(); } },
      { path: `Subscription/SubscribeToPhotosUpdates?id=${userId}`, func: ()=>{ get(); } },
      { path: `Subscription/SubscribeToStoriesUpdates?id=${userId}`, func: ()=>{ getStories(); } },
    ])
  }, []);

  const render = () => {
    if(component === ComponentName.Photos){
      return (<Photos myId={myId} userId={userId} photos={photos} albums={albums} local={local}/>);
    }
    else if(component === ComponentName.Albums){
      return (<Albums myId={myId} userId={userId} albums={albums} local={local}/>);
    }
    else if(component === ComponentName.Stories){
      return (<StoriesAlbums myId={myId} userId={userId} stories={stories} local={local}/>);
    }
    else {
      return(<></>);
    }
  }

  return (
    <div className={styles.container}>
      <div className="flex justify-between items-center">
        <h2>{local.gallery.title}</h2>
        {userId === myId?(<CreateAlbum local={local}/>):(<></>)}
      </div>
      <div className={styles.nav}>
        <div {...component === ComponentName.Photos ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === ComponentName.Photos ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Photos) }}>{local.gallery.photo}</button>
        </div>
        <div {...component === ComponentName.Albums ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === ComponentName.Albums ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Albums) }}>{local.gallery.album}</button>
        </div>
        <div {...component === ComponentName.Stories ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === ComponentName.Stories ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Stories) }}>{local.gallery.stories}</button>
        </div>
      </div>
      {render()}
    </div>
  )
}