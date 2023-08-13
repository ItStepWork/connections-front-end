import { useEffect, useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import styles from './styles.module.scss';

export function Avatar(props: any) {

  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetUser?id=" + props.myId, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + props.accessToken
      },
    });

    if (response.ok) {
      let result = await response.json();
      setUser(result);
    }
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