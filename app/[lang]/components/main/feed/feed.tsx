"use client"

import { useState, useEffect } from 'react';
import { MdOutlineAddAPhoto } from "react-icons/md";
import PhotoAction from '../../gallery/photoAction/page';
import styles from './feed.module.scss';
import { PostService } from '../../../../../services/post.service';

export default function Feed(props: any) {

  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const result = await PostService.getPosts(props.userId);
    setPosts(result);
  }

  const createPost = async () => {
    await PostService.createPost({ text: text });

    getPosts();

    setText('');
  }

  return (
    <div className={styles.container}>
      <div>
        <label className={styles.addPhoto}>
          <MdOutlineAddAPhoto size={50} className="fill-button_blue_BG" />
          <p className='text-center'>Создать новый пост</p>
          <input type='text' className='hidden' onChange={(e) => { setText(e.target.value) }} value={text} />
          <button onClick={createPost}>Опубликовать</button>
        </label>
      </div>
      {posts.map((post: any, index: any) => {
        return (
          <div key={index} className='relative'>
            <div className='absolute right-0 bottom-0'>
              <PhotoAction get={props.get} photo={post.photo} albums={props.albums} />
            </div>
            <div className={styles.image}>
              <p>{post.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}