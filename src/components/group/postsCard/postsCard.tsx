
import { PostPanel } from '@/components/main/postPanel/postPanel';
import styles from './postsCard.module.scss';
import { FiSearch } from 'react-icons/fi';

export const PostsCard = () => {
  return (
    <>
      <PostPanel />
      <div className={styles.container}>
        <div className="flex mb-6">
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder="Введите название" />
        </div>
        Здесь будут посты наверняка
      </div >


    </>
  )
}