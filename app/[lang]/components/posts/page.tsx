"use client"

import { useEffect, useState } from "react";
import StoriesBlock from '../main/stories/stories-block/stories-block';
import styles from './styles.module.scss';
import CreatePost from './createPost/page';
import { PostsCard } from './postsCard/postsCard';
import { PostService } from '../../../../services/post.service';
import { StoriesServices } from "../../../../services/stories.service";
import { SubscriptionService } from "../../../../services/subscription.service";

export default function Posts(props: any) {

  const [posts, setPosts] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    load();
    return SubscriptionService.subscribeToChannels(props.session.user.accessToken, [
      { path: `Subscription/SubscribeToPostsUpdates?id=${props.userId}`, func: getPosts },
      { path: `Subscription/SubscribeToStoriesUpdates?id=${props.userId}`, func: getStories },
    ]);
  }, [])

  const load = async () => {
    getPosts();
    getStories();
  }

  const getPosts = async () => {
    let result = await PostService.getPosts(props.userId);
    setPosts(result);
  }

  const getStories = async () => {
    let result = await StoriesServices.getStories(props.userId);
    setStories(result);
  }

  return (
    props.local &&
    <>
      <div className={styles.container}>
        {(stories.length > 0 || props.myId === props.userId) && <StoriesBlock local={props.local} myId={props.myId} userId={props.userId} stories={stories} />}
        <CreatePost local={props.local} userId={props.userId} />
        {posts.length > 0 && <PostsCard local={props.local} myId={props.myId} userId={props.userId} posts={posts} />}
      </div>
    </>
  )
}
