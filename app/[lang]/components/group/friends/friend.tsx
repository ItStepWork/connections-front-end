import { faker } from "@faker-js/faker";
import Image from 'next/image';
import { FC } from "react";
import { BsFillPersonCheckFill, BsPlusLg } from "react-icons/bs";
import { FriendService } from "../../../../../services/friend.service";
import styles from "./friends.module.scss";
import { FriendStatus } from "../../../../../enums/all.enum";

interface IFriendProps {
  friendStatus: FriendStatus;
  firstName: string;
  lastName: string;
  work: string;
  avatar: string;
  id: string
  getUsers: Function
}

export const Friend: FC<IFriendProps> = ({ friendStatus, firstName, lastName, work, avatar, id, getUsers }) => {


  if (firstName === null) firstName = 'ошибка загрузки';
  if (lastName === null) lastName = 'ошибка загрузки';

  const invateFriend = async () => {
    // await FriendService.addFriend(id);
    getUsers();
  }

  return (
    <>
      <div className={styles.followerContainer}>
        {/* <div className={styles.avatar}> */}
        <img className={styles.avatar}
          src={avatar}
          // quality={80}
          style={{ objectFit: "contain" }}
          alt="avatar"
          loading="lazy"
        />
        {/* </div> */}
        <div className={styles.userInfo}>
          <p>{firstName + ' ' + lastName}</p>
          <span>{work === '' || work === undefined || work === null ? 'Не указано' : work}</span>
        </div>
        <div className="">
          <button onClick={() => invateFriend()} className={styles.button}>{<BsPlusLg size={16} />}</button>
        </div>
      </div>
    </>
  )
}