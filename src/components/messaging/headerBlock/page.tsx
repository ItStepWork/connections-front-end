import { DropDownItem } from '../dropDownItem/page'
import styles from './styles.module.scss'

export default function HeaderBlock() {

  return (
    <>
    <div>
      <div className={styles.container}>
        <div className={styles.user}>
          <img className={styles.userImage} src="../favicon.ico" alt="Rounded avatar" />
          <div className={styles.userInfo}>
            <span>Valik Lola</span>
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