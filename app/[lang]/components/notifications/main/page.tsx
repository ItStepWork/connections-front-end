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
          <div key={notification.notification.id} className='flex'>
            {notification.user.avatarUrl?(<img className={styles.userImage} src={notification.user.avatarUrl}/>):(<FaUserCircle className={styles.userImage} />)}
            <div className='m-1'>
              {notification.user.firstName + " " + notification.user.lastName}
            </div>
            <div className='m-1'>
              {notification.notification.type === NotificationType.AddFriend ? (<>Хочет добавить вас в друзья</>):(<></>)}
              {notification.notification.type === NotificationType.RemoveFriend ? (<>Удалил вас с друзей</>):(<></>)}
              {notification.notification.type === NotificationType.ConfirmFriend ? (<>Подтвердил что вы его друг</>):(<></>)}
              {notification.notification.type === NotificationType.BirthDay ? (<>У него сегодня день рождение</>):(<></>)}
              {notification.notification.type === NotificationType.InviteToGroup ? (<>Пользователь приглашает Вас в группу <Link href={notification.notification.url}>{notification.notification.groupName}</Link></>):(<></>)}
            </div>
          </div>
        )
      })}
    </div>
  )
}