"use client"
import { FaUserCircle } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import styles from './styles.module.scss';

export default function UserDialog(props: any) {

    let last = new Date(props.dialog.user.lastVisit) as any;
    let date = new Date() as any;
    let minutes = ((date - last) / 60000);

    return (
        props.dialog.user &&
        <div className={styles.user}>
            {props.dialog.user.avatarUrl?(<img className={styles.userImage} src={props.dialog.user.avatarUrl}/>):(<FaUserCircle className={styles.userImage} />)}
            {minutes < 5?(<GoDotFill className="absolute fill-green-500 ml-7" />):(<GoDotFill className="absolute fill-red-500 ml-7" />)}
            <div className={styles.userInfo}>
                <span className={styles.userName}>{props.dialog.user.lastName} {props.dialog.user.firstName}</span>
                <span className={styles.userMessage}>{props.dialog.lastMessage.text}</span>
            </div>
        </div>
    )
}