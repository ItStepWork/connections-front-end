import UserDialog from '../../messaging/userDialog/page'
import styles from './styles.module.scss'

export default function MessagingLeftBlock(props: any) {

  const {
    dialogs,
    click,
    user
  } = props;

  return (
    <ul className={styles.users}>
      {dialogs && dialogs.map((dialog: any, index: any) =>
        <li key={index} onClick={() => click(dialog.user)} {...user?.id === dialog.user.id ? { className: "bg-slate-200 rounded-lg dark:bg-zinc-700" } : { className: "" }}>
          <UserDialog dialog={dialog} />
        </li>
      )}
    </ul>
  )
}