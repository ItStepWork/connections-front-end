'use client'

import { useState } from 'react';
import SelectedStory from '../selected-story/selected-story';
import styles from './story.module.scss';

const Story = (props: any) => {

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const select = () => {
    setIsSelected(true);
  }

  return (
    <>
      {
        props.story.photos.length > 0 &&
        <div className={styles.container}>
          <img className={styles.img} src={props.story.photos[0].url} alt="cover" onClick={select} />
        </div>
      }
      <SelectedStory key={props.story.id} local={props.local} isSelected={isSelected} photos={props.story.photos} setIsSelected={setIsSelected} storyId={props.story.id} />
    </>
  )
};

export default Story;
