import styles from './styles.module.scss'

export default function Emoji(props: any) {

  return (
    <div className={styles.container} onClick={()=>{props.addEmoji(props.emoji)}}>
      {props.emoji}
    </div>
  )
}