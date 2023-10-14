import styles from './styles.module.scss'

export default function Emoji(props: any) {

  const {
    emoji,
    addEmoji
  } = props;

  return (
    emoji &&
    <div className={styles.container} onClick={()=>{addEmoji(emoji)}}>
      {emoji}
    </div>
  )
}