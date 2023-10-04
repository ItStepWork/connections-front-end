"use client"
import { useEffect, useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import { UserService } from '../../../../../services/user.service';
import styles from './styles.module.scss';

export default function Comment(props: any) {

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
            <div className='text-xs break-all'>{props.comment.text}</div>
            <div className='text-xs break-all text-right'>{new Date(props.comment.createTime).toLocaleString()}</div>
            
          </div>
        </div>
      ) : (<></>)}
    </div>
  )
}