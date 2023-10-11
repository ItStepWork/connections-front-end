import { AddStories } from "../add-story-container/addStories";
import { Stories } from "../stories-container/storiesContainer";
import styles from './stories-block.module.scss';

const StoriesBlock = (props: any) => {

  const {
    local, 
    myId,
    userId,
    stories
  } = props;

  return (
    <div className={styles.storiesBlock}>
      <div className={styles.container}>
        {myId === userId && <AddStories local={local} />}
        {stories.length > 0 && <Stories local={local} myId={myId} userId={userId} stories={stories} />}
      </div>
    </div>
  )
};

export default StoriesBlock;
