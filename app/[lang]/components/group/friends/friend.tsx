import { faker } from "@faker-js/faker";
import Image from 'next/image';
import { FC, useEffect } from "react";
import { BsFillPersonCheckFill, BsPlusLg } from "react-icons/bs";
import { FriendService } from "../../../../../services/friend.service";
import styles from "./friends.module.scss";
import { FriendStatus } from "../../../../../enums/all.enum";
import { NotificationService } from "../../../../../services/notification.service";
import { getSession } from "next-auth/react";

interface IFriendProps {
  friendStatus: FriendStatus;
  firstName: string;
  lastName: string;
  work: string;
  avatar: string;
  id: string
  groupId: string
}

export const Friend: FC<IFriendProps> = ({ friendStatus, firstName, lastName, work, avatar, id, groupId }) => {
  // useEffect(() => { subscribe() }, [])

  if (firstName === null) firstName = 'ошибка загрузки';
  if (lastName === null) lastName = 'ошибка загрузки';

  const invateFriend = async () => {
    await NotificationService.inviteToGroup(id, groupId)
  }

  return (
    <>
      <div className={styles.followerContainer}>
        <img className={styles.avatar}
          src={avatar}
          style={{ objectFit: "contain" }}
          alt="avatar"
          loading="lazy"
        />
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