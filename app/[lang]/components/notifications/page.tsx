'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Gender, NotificationType } from '../../../../enums/all.enum';
import { NotificationService } from '../../../../services/notification.service';
import { SubscriptionService } from '../../../../services/subscription.service';
import styles from './styles.module.scss';

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
                  {n.notification.type === NotificationType.AddFriend ? (<>{props.local.notifications.addFriend}</>) : (<></>)}
                  {n.notification.type === NotificationType.RemoveFriend ? (<>{props.local.notifications.removeFriend}</>) : (<></>)}
                  {n.notification.type === NotificationType.RefusedFriend ? (<>{props.local.notifications.refusedFriend}</>) : (<></>)}
                  {n.notification.type === NotificationType.CancelFriend ? (<>{props.local.notifications.cancelFriend}</>) : (<></>)}
                  {n.notification.type === NotificationType.ConfirmFriend ? (<>{props.local.notifications.confirmFriend}</>) : (<></>)}
                  {n.notification.type === NotificationType.BirthDay ? (<>{props.local.notifications.birthday}</>) : (<></>)}
                  {n.notification.type === NotificationType.LikePhoto ? (<>{props.local.notifications.likePhoto}</>) : (<></>)}
                  {n.notification.type === NotificationType.CommentPhoto ? (<>{props.local.notifications.commentPhoto}</>) : (<></>)}
                  {n.notification.type === NotificationType.InviteToGroup && n.notification.url ? (<>{props.local.notifications.inviteToGroup} <Link className='underline text-blue-600 visited:text-purple-600' href={n.notification.url}>{n.notification.groupName}</Link></>) : (<></>)}
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