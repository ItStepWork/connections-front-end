"use client"

import { useEffect, useState } from "react";
import { FollowsBlock } from '../main/follows/followsBlock';
import StoriesBlock from '../main/stories/stories-block/stories-block';
import styles from './styles.module.scss';
import CreatePost from './createPost/page';
import { PostsCard } from './postsCard/postsCard';
import { PostService } from '../../../../services/post.service';

export default function Posts(props: any) {
  
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    load();
    let socket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToPostsUpdates?id=${props.userId}`, ["client", props.session.user.accessToken]);
    socket.addEventListener('message', (event) => {
      load();
    });
    let intervalId = setInterval(() => {
      if (socket.OPEN) socket.send("ping");
      else clearInterval(intervalId);
    }, 30000);
    return () => {
      setInterval(() => { if (socket.OPEN) socket.close(); }, 1000)
      clearInterval(intervalId);
    };
  }, [])

  const load = async () => {
    let result = await PostService.getPosts(props.userId);
    setPosts(result);
  }

  return (
    props.local &&
    <>
      <div className={styles.container}>
        <div className={styles.storiesBlock}>
          <StoriesBlock local={props.local} myId={props.myId} userId={props.userId}/>
        </div>
        <CreatePost local={props.local} userId={props.userId}/>
        {posts.length > 0 && <PostsCard local={props.local}  myId={props.myId} userId={props.userId} posts={posts}/>}
      </div>
    </>
  )
}
