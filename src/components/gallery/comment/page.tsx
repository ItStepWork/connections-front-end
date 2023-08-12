import styles from './styles.module.scss'
import { useState, useEffect } from "react";
import { FaUserCircle } from 'react-icons/fa';

export function Comment(props: any) {

  const [text, setText] = useState("");
  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetUser?id=" + props.comment.senderId, {
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
            <span className='text-xs'>{props.comment.text}</span>
          </div>
        </div>
      ) : (<></>)}
    </div>
  )
}