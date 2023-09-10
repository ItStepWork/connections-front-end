import { Feed } from '../main/feed/feed';
import { FollowsBlock } from '../main/follows/followsBlock';
import { News } from '../main/news/news';
import { PostPanel } from '../main/postPanel/postPanel';
import { AddStories } from '../main/stories/addStories';
import { Stories } from '../main/stories/stories';
import styles from './styles.module.scss';

export default function Posts(props: any) {

  return (
    props.local &&
    <>
      <div>
          <div className={styles.storiesBlock}>
            <AddStories local={props.local}/>
            <Stories local={props.local}/>
          </div>
          <PostPanel local={props.local}/>
          <Feed />
        </div>
        <div>
          <FollowsBlock />
          <News />
        </div>
    </>
  )
}
