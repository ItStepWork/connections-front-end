'use client'
import { useEffect, useState } from 'react';
import { StoriesServices } from '../../../../../../services/stories.service';
import SelectedStory from '../selected-story/selected-story';
import styles from './story.module.scss';

const Story = (props: any) => {
  
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const getPhotos = async () => {
    let array = await StoriesServices.getStoryPhotos(props.userId, props.story.id);
    setPhotos(array);
    setIsLoading(true);   
  }

  const select = () => {
    setIsSelected(true);
  }
  
  useEffect(() => {
    if(photos.length === 0)
    getPhotos();
  }, []);
  
  return (
    <>
    {
      photos &&
      <div className={styles.container}>     
      {
        isLoading 
        ? <img className={styles.img} src={photos[0].url} alt="cover" onClick={select} />
        : <></>
      }       
      </div>
    }
    <SelectedStory key={props.story.id} isSelected={isSelected} photos={photos} setIsSelected={setIsSelected} storyId={props.story.id}/>
    </>
  )
};

export default Story;
