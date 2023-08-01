import styles from './styles.module.scss'

export default function RigthMessage(props: any) {


  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          {props.message.text}
        </div>
        <div className={styles.time}>{new Date(props.message.createTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
      </div>
    </>
  )
}