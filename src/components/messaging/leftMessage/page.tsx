import styles from './styles.module.scss'

export default function LeftMessage(props: any) {

  return (
    <>
      <div className={styles.container}>
        <img className={styles.userImage} src="../favicon.ico" alt="Rounded avatar" />
        <div className={styles.verticalContainer}>
          <div className={styles.content}>
            {props.message.link?(<img src={props.message.link} alt="Rounded avatar" />):(<></>)}
            {props.message.text}
          </div>
          <div className={styles.time}>{new Date(props.message.createTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
        </div>
      </div>
    </>
  )
}