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
  getUsers: Function
}

export const Friend: FC<IFriendProps> = ({ friendStatus, firstName, lastName, work, avatar, id, groupId, getUsers }) => {
  useEffect(() => { subscribe() }, [])

  if (firstName === null) firstName = 'ошибка загрузки';
  if (lastName === null) lastName = 'ошибка загрузки';

  const invateFriend = async () => {
    await NotificationService.inviteToGroup(id, groupId)
  }
  const subscribe = async () => {
    let session = await getSession();
    if (session != null) {
      let groupSocket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToGroupUpdates?id=${groupId}`, ["client", session.user.accessToken]);
      groupSocket.addEventListener('message', (event) => {
        getUsers();
      });
      let friendSocket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToFriendsUpdates`, ["client", session.user.accessToken]);
      friendSocket.addEventListener('message', (event) => {
        getUsers();
      });
      setInterval(() => {
        friendSocket.send("ping");
        groupSocket.send("ping");
      }, 30000);
    }
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