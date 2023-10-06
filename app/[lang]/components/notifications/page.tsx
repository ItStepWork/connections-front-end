'use client'
import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { NotificationService } from '../../../../services/notification.service';
import styles from './styles.module.scss';
import { Gender, NotificationType } from '../../../../enums/all.enum';
import Link from 'next/link';
import React from 'react';
import { SubscriptionService } from '../../../../services/subscription.service';

export default function Notifications(props: any) {

  const [notifications, setNotifications] = useState<any[]>([]);
  const [count, setCount] = useState<number>(5);

  useEffect(() => {
    getNotifications();
    return SubscriptionService.subscribeToChannel(props.session.user.accessToken, `Subscription/SubscribeToNotificationUpdates`, getNotifications);
  }, []);

  const getNotifications = async () => {
    let result = await NotificationService.getNotifications();
    setNotifications(result);
  }
  
  const loadMore = () => {
    setCount(count + 5);
  }

  const getGender=(user: any)=>{
    return user.gender === Gender.Female ? "ла" : "в";
  }

  return (
    <div className={styles.container}>
      {notifications.map((n: any, index: number) => {
        if(index < count)
        return (
          <div key={n.notification.id} className=''>
            <div className='flex'>
              {n.user.avatarUrl ? (<img className={styles.userImage} src={n.user.avatarUrl} />) : (<FaUserCircle className={styles.userImage} />)}
              <div className={styles.content}>
                <h2 className='text-sm'>
                  {n.user.firstName + " " + n.user.lastName}&nbsp;
                </h2>
                <div className='text-lg'>
                  {n.notification.type === NotificationType.AddFriend ? (<>хоче додати вас до друзів</>) : (<></>)}
                  {n.notification.type === NotificationType.RemoveFriend ? (<>видали{getGender(n.user)} вас із друзів</>) : (<></>)}
                  {n.notification.type === NotificationType.RefusedFriend ? (<>не підтверди{getGender(n.user)} що ви друзі</>) : (<></>)}
                  {n.notification.type === NotificationType.CancelFriend ? (<>відміни{getGender(n.user)} запит на дружбу</>) : (<></>)}
                  {n.notification.type === NotificationType.ConfirmFriend ? (<>підтвердив, що ви його друг</>) : (<></>)}
                  {n.notification.type === NotificationType.BirthDay ? (<>святкує сьогодні день народження</>) : (<></>)}
                  {n.notification.type === NotificationType.LikePhoto ? (<>вподоба{getGender(n.user)} Ваше фото</>) : (<></>)}
                  {n.notification.type === NotificationType.CommentPhoto ? (<>написа{getGender(n.user)} коментар до вашого фото</>) : (<></>)}
                  {n.notification.type === NotificationType.InviteToGroup && n.notification.url ? (<>запрошує Вас до групи <Link className='underline text-blue-600 visited:text-purple-600' href={n.notification.url}>{n.notification.groupName}</Link></>) : (<></>)}
                </div>
                <div className={styles.dateTime}>{new Date(n.notification.dateTime).toLocaleString()}</div>
              </div>
            </div>
            <hr className={styles.horizontalHr} />
          </div>
        )
      })}
      
      {notifications.length > count && <button className={styles.buttonLoadMore} onClick={loadMore}>Загрузить еще</button>}
    </div>
  )
}