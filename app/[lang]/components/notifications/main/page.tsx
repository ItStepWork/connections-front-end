import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { NotificationService } from '../../../../../services/notification.service';
import styles from './styles.module.scss';
import { Gender, NotificationType } from '../../../../../enums/all.enum';
import Link from 'next/link';
import { getSession } from 'next-auth/react';

export default function Notifications(props: any) {

  const [notifications, setNotifications] = useState<any[]>([]);

  const get = async () => {
    let result = await NotificationService.getNotifications();
    setNotifications(result);
  }

  useEffect(() => {
    get();
    subscribe();
  }, []);

  const subscribe = async () => {
    let session = await getSession();
    if (session != null) {
      let socket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToNotificationUpdates`, ["client", session.user.accessToken]);
      socket.addEventListener('message', (event) => {
        get();
      });
      setInterval(() => {
        socket.send("ping");
      }, 30000);
    }
  }

  return (
    <div className={styles.container}>
      {notifications.map((n: any) => {
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
                  {n.notification.type === NotificationType.RemoveFriend ? (<>вида{n.user.gender === Gender.Female ? "лила" : "лив"} вас із друзів</>) : (<></>)}
                  {n.notification.type === NotificationType.ConfirmFriend ? (<>підтвердив, що ви його друг</>) : (<></>)}
                  {n.notification.type === NotificationType.BirthDay ? (<>святкує сьогодні день народження</>) : (<></>)}
                  {n.notification.type === NotificationType.InviteToGroup ? (<>запрошує Вас до групи <Link className='underline text-blue-600 visited:text-purple-600' href={n.notification.url}>{n.notification.groupName}</Link></>) : (<></>)}
                </div>
                <div className={styles.dateTime}>{new Date(n.notification.dateTime).toLocaleString()}</div>
              </div>
            </div>
            <hr className={styles.horizontalHr} />
          </div>
        )
      })}
    </div>
  )
}