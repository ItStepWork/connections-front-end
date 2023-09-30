import styles from './styles.module.scss'

export default function TopMessage(props: any) {

  return (
    <>
      <div className={styles.container}>
        {props.date}
      </div>
    </>
  )
}