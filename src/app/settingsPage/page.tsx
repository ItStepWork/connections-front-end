import { AccountSettings } from "@/components/profileSettings/caccountSettings/accountSettings";
import { ChangePassword } from "@/components/profileSettings/changePassword/chagePassword";
import { LeftBar } from "@/components/profileSettings/leftBar/leftbar";
import styles from './styles.module.scss';

export default function LoginPage() {
  return (
    <>
      <main className={styles.container}>
        <div className={styles.contentContainer}>
          <LeftBar />
          <AccountSettings />
          <ChangePassword />
        </div>
      </main>
    </>
  )
}