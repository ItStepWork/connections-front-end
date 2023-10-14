"use client"
import { FaUserCircle } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import styles from './styles.module.scss';

export default function UserDialog(props: any) {

    const { dialog } = props;

    let last = new Date(dialog.user.lastVisit) as any;
    let date = new Date() as any;
    let minutes = ((date - last) / 60000);

    return (
        dialog.user &&
        <div className={styles.user}>
            {dialog.user.avatarUrl?(<img className={styles.userImage} src={dialog.user.avatarUrl}/>):(<FaUserCircle className={styles.userImage} />)}
            {minutes < 5?(<GoDotFill className="absolute fill-green-500 ml-7" />):(<GoDotFill className="absolute fill-red-500 ml-7" />)}
            <div className={styles.userInfo}>
                <span className={styles.userName}>{dialog.user.lastName} {dialog.user.firstName}</span>
                <span className={styles.userMessage}><span className='truncate'>{dialog.lastMessage.text}</span> {dialog.unreadMessages !== 0 && <span className={styles.unreadMessages}>{dialog.unreadMessages}</span>}</span>
                
            </div>
        </div>
    )
}