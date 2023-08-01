import { DropDownItem } from '../dropDownItem/page'
import styles from './styles.module.scss'

export default function HeaderBlock(props: any) {

  return (
    <>
    <div>
      <div className={styles.container}>
        <div className={styles.user}>
          <img className={styles.userImage} src="../favicon.ico" alt="Rounded avatar" />
          <div className={styles.userInfo}>
            <span>{props.user.email}</span>
            <span className={styles.userStatus}>Online</span>
          </div>
        </div>
        <DropDownItem/>
      </div>
      <hr className={styles.hr} />
    </div>
    </>
  )
}