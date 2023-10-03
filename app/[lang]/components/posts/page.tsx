import dynamic from 'next/dynamic';
import { PostsCard } from '../group/postsCard/postsCard';
import { Feed } from '../main/feed/feed';
import { FollowsBlock } from '../main/follows/followsBlock';
import { News } from '../main/news/news';
import StoriesBlock from '../main/stories/stories-block/stories-block';


import styles from './styles.module.scss';

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
        <Feed />
      </div>
      <div>
        <FollowsBlock />
      </div>
    </>
  )
}
