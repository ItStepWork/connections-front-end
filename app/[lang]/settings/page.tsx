import { LeftSettingsMenu } from "../components/profileSettings/leftSettingsMenu/leftSettingsMenu";
import { AccountSettings } from "../components/profileSettings/accountSettings/accountSettings";
import ChangeAvatar from "../components/profileSettings/changeAvatar/cnangeAvatar";
import ChangeBgImg from "../components/profileSettings/changeBackroundImg/changeBGImg";
import { ChangePassword } from "../components/profileSettings/changePassword/changePassword";
import styles from './styles.module.scss';


export default function SettingsPage() {
  return (
    <>
      <main>
        <div className={styles.container}>
          <div className={styles.contentContainer}>
            <div className={styles.wrapper}>
              <div className={styles.leftMenu}>
                <LeftSettingsMenu />
              </div>
              <div className={styles.accSettings}>
                <AccountSettings />
              </div>
            </div>
            <div className={styles.changePass}>
              <ChangeAvatar/>
              <ChangeBgImg/>
              <ChangePassword />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}