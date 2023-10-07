'use client'
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { FriendStatus } from "../../../../../enums/all.enum"
import { FriendService } from "../../../../../services/friend.service"
import { Follower } from "./follower"
import styles from "./follows.module.scss"

export const FollowsBlock = (props : any) => {

  const [users, setUsers] = useState<any[]>([]);
  const [elements, setElements] = useState(5);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let session = await getSession();
    if(session != null){
      let result = await FriendService.getFriends(session.user.id); 
      let filter = result.filter((user: any)=>user.friendStatus === FriendStatus.Other);
      setUsers(filter);
    }
  } 

  const loadMore = () => {
    setElements(elements + 5);
  }

  return (
    <>
      <div className={styles.container}>
        <h2>{props.local.followers}</h2>
        <div className={styles.followersBlock}>
          {
            users.map((user: any, index) => {
              if(index < elements){
                return(<Follower key={user.id} 
                  friendStatus={user.friendStatus} 
                  firstName={user.firstName} 
                  lastName={user.lastName} 
                  work={user.work} 
                  avatar={user.avatarUrl} 
                  id={user.id} 
                  getUsers={getUsers}
                  local={props.local}/>)
              }
            })
          }           
        </div>
        <button className={styles.buttonLoadMore} onClick={() => loadMore()}>{props.local.button.uploadMore}</button>
      </div>
    </>
  )
}
