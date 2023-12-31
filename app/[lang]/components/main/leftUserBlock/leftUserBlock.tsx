"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FcAdvertising, FcBusinessman, FcCalendar, FcCollaboration, FcHome, FcNews, FcSettings, FcStackOfPhotos } from "react-icons/fc"
import { ComponentName } from "../../../../../enums/all.enum"
import { FriendService } from "../../../../../services/friend.service"
import { PostService } from "../../../../../services/post.service"
import { SubscriptionService } from "../../../../../services/subscription.service"
import { UserService } from "../../../../../services/user.service"
import styles from "./leftUserBlock.module.scss"

export const LeftUserBlock = (props: any) => {

  const {
    session,
    setComponent,
    setIsOpen,
    myId, 
    local,
    lang
  } = props;
  
  const [friendsCount, setFriendsCount] = useState<number>(0);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [user, setUser] = useState<any>(null);

  const getData = async () => {
    const postResult: any[] = await PostService.getPosts(myId);
    setPostsCount(postResult.length);

    const friendsResult: any[] = await FriendService.getFriends(myId);
    const sort = friendsResult.filter((obj) => {
      return obj.friendStatus === 'Confirmed';
    })
    setFriendsCount(sort.length);
  }

  const getUser = async () => {
    let result = await UserService.getCurrentUser();
    setUser(result);
  }

  useEffect(() => {
    getData();
    getUser();
    return SubscriptionService.subscribeToChannel(session.user.accessToken, `Subscription/SubscribeToUserUpdates?id=${session.user.id}`, getUser);
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imagesBlock}>
          <div className={styles.bg}>
            {
              user?.backgroundUrl &&
              <img src={user.backgroundUrl}></img>
            }
          </div>

        </div>
        <div className={styles.aboutMeBlock}>
          <div className={styles.avatar}>
            {
              user?.avatarUrl &&
              <img src={user.avatarUrl}></img>
            }
          </div>
          <h3>{session?.user?.firstName + ' ' + session?.user?.lastName}</h3>
          <div className={styles.work}>{session?.user?.work}</div>
          <div className={styles.aboutMe}>{session?.user?.aboutMe}</div>
          <div className={styles.followsBlock}>
            <div className={styles.followers}>
              <h3>{postsCount}</h3>
              <div>{local.main.header.posts}</div>
            </div>
            <div className={styles.vr}></div>
            <div className={styles.followers}>
              <h3>{friendsCount}</h3>
              <div>{local.main.header.contacts}</div>
            </div>
          </div>
        </div>
        <div className={styles.navigationBlock}>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcHome size={20} />
            </div>
            <button 
              onClick={() => { setComponent(ComponentName.Posts); 
              setIsOpen(false); }}>
                {local.main.feed}
            </button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcBusinessman size={20} />
            </div>
            <button 
              onClick={() => { setComponent(ComponentName.Connections); 
              setIsOpen(false); }}>
                {local.main.contacts}
            </button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcNews size={20} />
            </div>
            <button 
              onClick={() => { setComponent(ComponentName.News); 
              setIsOpen(false); }}>
                {local.main.news}
            </button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcCalendar size={20} />
            </div>
            <button 
              onClick={() => { setComponent(ComponentName.Celebration); 
              setIsOpen(false); }}>
                {local.main.events}
            </button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcCollaboration size={20} />
            </div>
            <button 
              onClick={() => { setComponent(ComponentName.Groups); 
              setIsOpen(false); }}>
                {local.main.groups}
            </button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcStackOfPhotos size={20} />
            </div>
            <button 
              onClick={() => { setComponent(ComponentName.Gallery);
               setIsOpen(false); }}>
                {local.main.gallery}
            </button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcAdvertising size={20} />
            </div>
            <button 
              onClick={() => { setComponent(ComponentName.Notifications); 
              setIsOpen(false); }}>
              {local.main.notifications}
            </button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcSettings size={20} />
            </div>
            <Link href={`/${lang}/settings`}>{local.main.settings}</Link>
          </div>
        </div>
        <div className={styles.viewProfile}>
          {session ?
            (<Link className={styles.button} href={`/${lang}/profile/${session.user.id}`}>{local.main.profile}</Link>)
            :
            (<></>)
          }
        </div>
      </div>
    </>
  )
}

