import { useEffect, useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import styles from './styles.module.scss';
import { UserService } from "@/services/user.service";

export function Avatar(props: any) {

  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    let result = await UserService.getUser(props.myId);
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
          </div>
        </div>
      ) : (<></>)}
    </div>
  )
}