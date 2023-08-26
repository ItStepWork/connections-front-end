import { UserService } from '@/services/user.service';
import styles from './styles.module.scss'
import { useState, useEffect } from "react";
import { FaUserCircle } from 'react-icons/fa';

export function Comment(props: any) {

  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    let result = await UserService.getUser(props.comment.senderId);
    setUser(result);
  }

  useEffect(() => {
    getUser();
  }, []);


  return (
    <div className={styles.container}>
      {user ? (
        <div className={styles.user}>
          {user?.avatarUrl ? (<img className={styles.userImage} src={user.avatarUrl} />) : (<FaUserCircle className={styles.userImage} />)}
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.lastName} {user.firstName}</span>
            <div className='text-xs break-all w-44'>{props.comment.text}</div>
          </div>
        </div>
      ) : (<></>)}
    </div>
  )
}