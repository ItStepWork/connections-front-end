import { AccountSettings } from "@/components/profileSettings/accountSettings/accountSettings";
import { ChangePassword } from "@/components/profileSettings/changePassword/changePassword";
import { LeftBar } from "@/components/profileSettings/leftBar/leftbar";
import styles from './styles.module.scss';

export default function LoginPage() {
  return (
    <>
      <main>
        <div className={styles.container}>
          <div className={styles.contentContainer}>
            <LeftBar />
            <AccountSettings />
            <ChangePassword />
          </div>
        </div>
      </main>
    </>
  )
}