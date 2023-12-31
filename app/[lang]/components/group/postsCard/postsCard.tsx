
import { FiSearch } from 'react-icons/fi';
import styles from './postsCard.module.scss';
import { PostsBlock } from '../../main/postBlock/postBlock';

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
        {props.local.development}
        <PostsBlock></PostsBlock>
        <PostsBlock></PostsBlock>
      </div >
    </>
  )
}