import UserDialog from '../../messaging/userDialog/page'
import styles from './styles.module.scss'

export default function MessagingLeftBlock(props: any) {

  return (
    <ul className={styles.users}>
      {props.dialogs && props.dialogs.map((dialog: any, index: any) =>
        <li key={index} onClick={() => props.click(dialog.user)} {...props.user?.id === dialog.user.id ? { className: "bg-slate-200 rounded-lg dark:bg-zinc-700" } : { className: "" }}>
          <UserDialog dialog={dialog} />
        </li>
      )}
    </ul>
  )
}