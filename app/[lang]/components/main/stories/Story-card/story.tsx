'use client'

import { useState } from 'react';
import SelectedStory from '../selected-story/selected-story';
import styles from './story.module.scss';

const Story = (props: any) => {

  const {
    local, 
    myId,
    userId,
    stories,
    index,
    story
  } = props;

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const select = () => {
    setIsSelected(true);
  }

  return (
    <>
      {
        story.photos.length > 0 &&
        <div className={styles.container}>
          <img className={styles.img} src={story.photos[0].url} alt="cover" onClick={select} />
          <div className={styles.storyName}>
            <p>{story.name}</p>
          </div>
        </div>
      }
      <SelectedStory 
        key={story.id} 
        local={local} 
        isSelected={isSelected} 
        photos={story.photos} 
        setIsSelected={setIsSelected} 
        storyId={story.id} 
      />
    </>
  )
};

export default Story;
