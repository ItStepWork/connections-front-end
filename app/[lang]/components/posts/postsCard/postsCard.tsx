import { FiSearch } from 'react-icons/fi';
import PostInfo from '../postInfo/postInfo';
import styles from './postsCard.module.scss';

export const PostsCard = (props: any) => {

  const {
    posts,
    local,
    getPosts,
    myId,
    userId
  } = props;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder={local.search.searchPost} />
        </div>
        {posts.map((post: any)=> (
          <PostInfo 
            key={post.id} 
            myId={myId} 
            local={local} 
            userId={userId} 
            post={post} 
            getPosts={getPosts}/>
        ))}
      </div >
    </>
  )
}