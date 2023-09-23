import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../../locale-dictionary";
import { AccountSettings } from "../components/profile-settings/account-settings/account-settings";
import { ChangePassword } from "../components/profile-settings/change-password/change-password";
import ChangeImages from "../components/profile-settings/change-profile-images/main";
import { LeftSettingsMenu } from "../components/profile-settings/sidebar-settings/sidebar-settings";
import styles from './styles.module.scss';

export default async function SettingsPage({ params: { lang }}: { params: { lang: Locale }}, props : any) {

  const locDictionary = await getDictionary(lang)

  return (
    <>
      <main>
        <div className={styles.container}>
          <div className={styles.contentContainer}>
            <div className={styles.wrapper}>
              <div className={styles.leftMenu}>
                <LeftSettingsMenu local={locDictionary} />
              </div>
              <div className={styles.accSettings}>
                <AccountSettings local={locDictionary} />
              </div>
            </div>
            <div className={styles.changePass}>
              <ChangeImages local={locDictionary} />
              <ChangePassword local={locDictionary} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}