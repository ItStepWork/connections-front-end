
import { FiSearch } from 'react-icons/fi';
import { PostPanel } from '../../main/postPanel/postPanel';
import styles from './postsCard.module.scss';

export const PostsCard = (props : any) => {
  return (
    <>
      <PostPanel local={props.local} />
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder="Введите название" />
        </div>
        {props.local.development}
      </div >
    </>
  )
}