import styles from './styles.module.scss'
import { GoDotFill } from 'react-icons/go';

export default function UserDialog(props: any) {

    let last = new Date(props.dialog.user.lastVisit) as any;
    let date = new Date() as any;
    let minutes = ((date - last) / 60000);

    return (
        <div className={styles.user}>
            <img className={styles.userImage} src="../favicon.ico" alt="Rounded avatar" />
            {minutes < 5?(<GoDotFill className="absolute fill-green-500 ml-7" />):(<GoDotFill className="absolute fill-red-500 ml-7" />)}
            <div className={styles.userInfo}>
                <span className={styles.userName}>{props.dialog.user.lastName} {props.dialog.user.firstName}</span>
                <span className={styles.userMessage}>{props.dialog.lastMessage.text}</span>
            </div>
        </div>
    )
}