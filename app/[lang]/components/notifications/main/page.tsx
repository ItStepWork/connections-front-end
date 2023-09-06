import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { NotificationService } from '../../../../../services/notification.service';
import styles from './styles.module.scss';

export default function Notifications(props: any) {

  const [notifications, setNotifications] = useState<any[]>([]);

  const get = async () => {
    let result = await NotificationService.getNotifications();
    setNotifications(result);
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
            <div>

            </div>
          </div>
        )
      })}
    </div>
  )
}