import LeftMessage from '../leftMessage/page'
import RigthMessage from '../rigthMassage/page'
import TopMessage from '../topMessage/page'
import styles from './styles.module.scss'

export default function MainBlock() {

  return (
    <>
      <div className={styles.container}>
        <TopMessage />
        <LeftMessage />
        <RigthMessage />
      </div>
    </>
  )
}