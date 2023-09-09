"use client"
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Feed } from '../main/feed/feed';
import { FollowsBlock } from '../main/follows/followsBlock';
import { News } from '../main/news/news';
import { PostPanel } from '../main/postPanel/postPanel';
import { AddStories } from '../main/stories/addStories';
import { Stories } from '../main/stories/stories';
import { PostService } from '@/services/post.service';
import styles from './styles.module.scss';

export default function Posts(props: any) {
    const [session, setSession] = useState(null);
    const [text, setText] = useState('');
  
    useEffect(async () => {
      const [Session, getSession] = useState(null);
      setSession(Session);
    }, []);
  
    const handleCreatePost = async () => {
      try {
        if (!session) {
          return;
        }
  
        const postService = new PostService();
  
        const response = await postService.createPost();
  
        console.log('Post created successfully', response);
  
        setText('');
  
      } catch (error) {
        console.error('Error creating post', error);
      }
    };

  return (
    <>
      <div>
          <div className={styles.storiesBlock}>
            <AddStories />
            <Stories />
          </div>
          <PostPanel />
          <Feed />
        </div>
        <div>
          <FollowsBlock />
          <News />
        </div>
        <div>
      <h1>Create Post</h1>
      {session ? (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your post text"
          />
          {}
          <button onClick={handleCreatePost}>Create Post</button>
        </div>
      ) : (
        <p>Please sign in to create a post.</p>
      )}
    </div>
    </>
  )
}
