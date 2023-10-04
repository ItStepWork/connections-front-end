import { PostsCard } from '../group/postsCard/postsCard';
import { FollowsBlock } from '../main/follows/followsBlock';
import StoriesBlock from '../main/stories/stories-block/stories-block';
import styles from './styles.module.scss';
import Feed from '../main/feed/feed';

export default function Posts(props: any) {
  
  return (
    props.local &&
    <>
      <div className={styles.container}>
        <div className={styles.storiesBlock}>
          <StoriesBlock local={props.local} myId={props.myId} userId={props.userId}/>
        </div>
        {/* <PostPanel local={props.local}/> */}
        <PostsCard local={props.local} />
        <Feed userId={props.userId} />
      </div>
      <div>
        <FollowsBlock />
      </div>
    </>
  )
}
