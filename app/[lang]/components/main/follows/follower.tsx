import { FC } from "react";
import { BsFillPersonCheckFill, BsPlusLg } from "react-icons/bs";
import { FaUserCircle } from 'react-icons/fa';
import { FriendStatus } from "../../../../../enums/all.enum";
import { FriendService } from "../../../../../services/friend.service";
import styles from "./follows.module.scss";

interface IFollowerProps {
  friendStatus: FriendStatus;
  firstName: string;
  lastName: string;
  work: string;
  avatar: string;
  id: string
  getUsers: Function
  local: any
}

export const Follower:FC<IFollowerProps> = ({friendStatus, firstName, lastName, work, avatar, id, getUsers, local}) => {


  if(firstName === null) firstName = local.dataInfo.loadError;
  if(lastName === null) lastName = local.dataInfo.loadError;
  
  const addFriend = async () => {
    await FriendService.addFriend(id);
    getUsers();
  } 
  
  return (
    <>
      <div className={styles.followerContainer}>
        {avatar ? (<img className={styles.avatar} src={avatar} />) : (<FaUserCircle className={styles.avatar} />)}
        <div className={styles.userInfo}>
          <p>{firstName +' '+ lastName}</p>
          <span>{work === '' || work === undefined || work === null ? local.dataInfo.notIndicated : work}</span>
        </div>
        <div className="">
          <button onClick={() => addFriend()} className={friendStatus === FriendStatus.Other ? styles.button : styles.buttonChecked}>{friendStatus === FriendStatus.Other ? <BsPlusLg size={16}/> : <BsFillPersonCheckFill size={16}/>}</button>
        </div>
      </div>
    </>
  )
}