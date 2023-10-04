import { FC } from "react";
import { BsFillPersonCheckFill, BsPlusLg } from "react-icons/bs";
import { FriendService } from "../../../../../services/friend.service";
import styles from "./follows.module.scss";
import { FriendStatus } from "../../../../../enums/all.enum";
import { FaUserCircle } from 'react-icons/fa';

interface IFollowerProps {
  friendStatus: FriendStatus;
  firstName: string;
  lastName: string;
  work: string;
  avatar: string;
  id: string
  getUsers: Function
}

export const Follower:FC<IFollowerProps> = ({friendStatus, firstName, lastName, work, avatar, id, getUsers}) => {


  if(firstName === null) firstName = 'ошибка загрузки';
  if(lastName === null) lastName = 'ошибка загрузки';
  
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
          <span>{work === '' || work === undefined || work === null ? 'Не указано' : work}</span>
        </div>
        <div className="">
          <button onClick={() => addFriend()} className={friendStatus === FriendStatus.Other ? styles.button : styles.buttonChecked}>{friendStatus === FriendStatus.Other ? <BsPlusLg size={16}/> : <BsFillPersonCheckFill size={16}/>}</button>
        </div>
      </div>
    </>
  )
}