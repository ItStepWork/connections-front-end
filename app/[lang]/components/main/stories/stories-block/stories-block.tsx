'use client'
import { useEffect, useState } from "react";
import { StoriesServices } from "../../../../../../services/stories.service";
import PageLoader from "../../../loaders/page-loader";
import { AddStories } from "../add-story-container/addStories";
import { Stories } from "../stories-container/storiesContainer";
import styles from './stories-block.module.scss';

const StoriesBlock = (props: any) => {
  const [stories, setStories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);


  const getStories = async () => {
    let result = await StoriesServices.getStories(props.userId);
    setStories(result);
    setIsLoading(true);
  }

  useEffect(() => {
    if(isDelete) { getStories(); }
    if(isAdded) { getStories(); }
    
    getStories();
  }, []);
  
  return (
    <>
      <div className={styles.container}>
        <AddStories local={props.local} setIsAdded={setIsAdded}/>
        {
          isLoading 
          ? <Stories local={props.local} myId={props.myId} userId={props.userId} setIsDelete={setIsDelete} stories={stories}/>
          : <PageLoader/>
        }
        
      </div>
    </>
  )
};

export default StoriesBlock;
