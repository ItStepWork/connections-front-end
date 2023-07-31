import styles from './styles.module.scss'

export default function RigthMessage(props: any) {


  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          {props.message.text}
        </div>
        <div>{new Date(props.message.createTime).toLocaleTimeString([], { minute: "2-digit", second: "2-digit" })}</div>
      </div>
    </>
  )
}