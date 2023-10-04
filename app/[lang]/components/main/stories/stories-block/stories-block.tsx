import { AddStories } from "../add-story-container/addStories";
import { Stories } from "../stories-container/storiesContainer";
import styles from './stories-block.module.scss';

const StoriesBlock = (props: any) => {

  return (
    <div className={styles.storiesBlock}>
      <div className={styles.container}>
        {props.myId === props.userId && <AddStories local={props.local} />}
        {props.stories.length > 0 && <Stories local={props.local} myId={props.myId} userId={props.userId} stories={props.stories} />}
      </div>
    </div>
  )
};

export default StoriesBlock;
