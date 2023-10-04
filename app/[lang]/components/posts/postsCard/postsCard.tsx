import { FiSearch } from 'react-icons/fi';
import styles from './postsCard.module.scss';
import PostInfo from '../postInfo/postInfo';

export const PostsCard = (props: any) => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder="Введите название" />
        </div>
        {props.posts.map((post: any)=> (
          <PostInfo key={post.id} myId={props.myId} userId={props.userId} post={post} />
        ))}
      </div >
    </>
  )
}