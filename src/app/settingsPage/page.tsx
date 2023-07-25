import { AccountSettings } from "@/components/profileSettings/accountSettings/accountSettings";
import { ChangePassword } from "@/components/profileSettings/changePassword/changePassword";
import { LeftSettingsMenu } from "@/components/profileSettings/leftSettingsMenu/leftSettingsMenu";
import styles from './styles.module.scss';


export default function LoginPage() {
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
              <ChangePassword />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}