import { FiSearch } from 'react-icons/fi';
import PostInfo from '../postInfo/postInfo';
import styles from './postsCard.module.scss';

export const PostsCard = (props: any) => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder={props.local.search.searchPost} />
        </div>
        {props.posts.map((post: any)=> (
          <PostInfo key={post.id} myId={props.myId} local={props.local} userId={props.userId} post={post} />
        ))}
      </div >
    </>
  )
}