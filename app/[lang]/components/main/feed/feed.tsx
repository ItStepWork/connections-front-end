import { useState, useEffect } from 'react';
import { MdOutlineAddAPhoto } from "react-icons/md";
import { GalleryService } from '../../../../../services/gallery.service';
import PhotoAction from '../../gallery/photoAction/page';
import SelectedPhoto from '../../gallery/selectedPhoto/page';
import styles from './styles.module.scss';
import { PostService } from '../../../../../services/post.service';

export default function Feed(props: any) {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [post, setPost] = useState([]); 
  const [newPostText, setNewPostText] = useState(''); 

  useEffect(() => {
    getPost(); 
  }, []);

  const getPost = async () => {
    const result = await PostService.getPost();
    setPost(result);
  }

  const createPost = async () => {
    if (newPostText) {
      await PostService.createPost({ text: newPostText });

      getPost();

      setNewPostText('');
    }
  }

  const change = (e: any) => {
    setNewPostText(e.target.value); 
  }

  const select = (index: number) => {
    setSelectedIndex(index);
    setIsSelected(true);
  }

  return (
    <div className={styles.container}>
      <div>
        <label className={styles.addPhoto}>
          <MdOutlineAddAPhoto size={50} className="fill-button_blue_BG" />
          <p className='text-center'>Создать новый пост</p>
          <input type='text' className='hidden' onChange={change} value={newPostText} />
          <button onClick={createPost}>Опубликовать</button>
        </label>
      </div>
      {post.map((post: any, index: any) => {
        return (
          <div key={index} className='relative'>
            <div className='absolute right-0 bottom-0'>
              <PhotoAction get={props.get} photo={post.photo} albums={props.albums} />
            </div>
            <div className={styles.image} onClick={() => { select(index) }}>
              <p>{post.text}</p>
            </div>
          </div>
        );
      })}
      <SelectedPhoto isSelected={isSelected} setIsSelected={setIsSelected} photos={post} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} myId={props.myId} userId={props.userId} get={getPost} />
    </div>
  );
}