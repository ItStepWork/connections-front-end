"use client"

import { useEffect, useState } from "react";
import { PostService } from '../../../../services/post.service';
import { StoriesServices } from "../../../../services/stories.service";
import { SubscriptionService } from "../../../../services/subscription.service";
import StoriesBlock from '../main/stories/stories-block/stories-block';
import CreatePost from './createPost/page';
import { PostsCard } from './postsCard/postsCard';
import styles from './styles.module.scss';

export default function Posts(props: any) {
  
  const {
    local,
    myId,
    session,
    userId,
    groupId
  } = props;

  const [posts, setPosts] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    load();
    return SubscriptionService.subscribeToChannels(session.user.accessToken, [
      { path: `Subscription/SubscribeToPostsUpdates?id=${userId ? userId : groupId}`, func: getPosts },
      { path: `Subscription/SubscribeToStoriesUpdates?id=${userId ? userId : groupId}`, func: getStories },
    ]);
  }, [])

  const load = async () => {
    getPosts();
    getStories();
  }

  const getPosts = async () => {
    if (userId != undefined) {
      let result = await PostService.getPosts(userId);
      setPosts(result);
    }
    if (groupId != undefined) {
      let result = await PostService.getPosts(groupId);
      setPosts(result);
    }
  }

  const getStories = async () => {
    let result = await StoriesServices.getStories(userId);
    setStories(result);
  }

  return (
    local &&
    <>
      <div className={styles.container}>
        {(stories.length > 0 || myId === userId) && <StoriesBlock local={local} myId={myId} userId={userId} stories={stories} />}
        <div className={styles.createPost}>
          <CreatePost local={local} userId={userId} groupId={groupId} placeholder={local.posts.placeholder} />
        </div>
        {posts.length > 0 && <PostsCard 
          local={local} 
          myId={myId} 
          userId={userId} 
          groupId={groupId} 
          posts={posts} 
          getPosts={getPosts} />}
      </div>
    </>
  )
}
