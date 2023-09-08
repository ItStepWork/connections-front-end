'use client'
import { useEffect, useState } from "react"
import { Follower } from "./follower"
import styles from "./follows.module.scss"
import { getSession } from "next-auth/react"
import { FriendService } from "../../../../../services/friend.service"
import { FriendStatus } from "../../../../../enums/all.enum"

export const FollowsBlock = () => {

  const [users, setUsers] = useState<any[]>([]);
  const [elements, setElements] = useState(5);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let session = await getSession();
    if(session != null){
      let result = await FriendService.getFriends(session.user.id); 
      let filter = result.filter((user: any)=>user.friendStatus === FriendStatus.Confirmed || user.friendStatus === FriendStatus.Other);
      setUsers(filter);
    }
  } 

  const loadMore = () => {
    setElements(elements + 5);
  }

  return (
    <>
      <div className={styles.container}>
        <h2>На кого подписаться</h2>
        <div className={styles.followersBlock}>
          {
            users.map((user: any, index) => {
              if(index < elements){
                return(<Follower key={user.id} friendStatus={user.friendStatus} firstName={user.firstName} lastName={user.lastName} work={user.work} avatar={user.avatarUrl} id={user.id} getUsers={getUsers}/>)
              }
            })
          }           
        </div>
        <button className={styles.buttonLoadMore} onClick={() => loadMore()}>Загрузить еще</button>
      </div>
    </>
  )
}
