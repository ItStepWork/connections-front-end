import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { NotificationService } from '../../../../../services/notification.service';
import styles from './styles.module.scss';
import { NotificationType } from '../../../../../enums/all.enum';
import Link from 'next/link';

export default function Notifications(props: any) {

  const [notifications, setNotifications] = useState<any[]>([]);

  const get = async () => {
    let result = await NotificationService.getNotifications();
    setNotifications(result);
    console.log(result);
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <div className={styles.container}>
      {notifications.map((notification: any) => {
        return (
          <div key={notification.notification.id} className=''>
            <div className='flex'>
              {notification.user.avatarUrl ? (<img className={styles.userImage} src={notification.user.avatarUrl} />) : (<FaUserCircle className={styles.userImage} />)}
              <div className='flex flex-col md:flex-row mx-3'>
                <h2 className='text-sm'>
                  {notification.user.firstName + " " + notification.user.lastName}&nbsp;
                </h2>
                <div className='text-lg'>
                  {notification.notification.type === NotificationType.AddFriend ? (<>хоче додати вас до друзів</>) : (<></>)}
                  {notification.notification.type === NotificationType.RemoveFriend ? (<>видалив вас із друзів</>) : (<></>)}
                  {notification.notification.type === NotificationType.ConfirmFriend ? (<>підтвердив, що ви його друг</>) : (<></>)}
                  {notification.notification.type === NotificationType.BirthDay ? (<>у нього сьогодні день народження</>) : (<></>)}
                  {notification.notification.type === NotificationType.InviteToGroup ? (<>запрошує Вас до групи <Link className='underline text-blue-600 visited:text-purple-600' href={notification.notification.url}>{notification.notification.groupName}</Link></>) : (<></>)}
                </div>
              </div>
            </div>
            <hr className={styles.horizontalHr} />
          </div>
        )
      })}
    </div>
  )
}