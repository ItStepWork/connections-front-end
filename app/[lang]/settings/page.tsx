import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../../locale-dictionary";
import { AccountSettings } from "../components/profileSettings/accountSettings/accountSettings";
import ChangeAvatar from "../components/profileSettings/changeAvatar/changeAvatar";
import ChangeBgImg from "../components/profileSettings/changeBackgroundImg/changeBGImg";
import { ChangePassword } from "../components/profileSettings/changePassword/changePassword";
import { LeftSettingsMenu } from "../components/profileSettings/leftSettingsMenu/leftSettingsMenu";
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
                <LeftSettingsMenu />
              </div>
              <div className={styles.accSettings}>
                <AccountSettings local={locDictionary} />
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