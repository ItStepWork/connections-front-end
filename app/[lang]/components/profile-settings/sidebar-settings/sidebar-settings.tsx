"use client"
import Link from "next/link"
import { FcAdvertising, FcBusinessman, FcFaq, FcFullTrash, FcPrivacy } from 'react-icons/fc'
import { toast } from "react-toastify"
import styles from './sidebar-settings.module.scss'
export const LeftSettingsMenu = ({ local, session }: { local: any, session: any }, props: any) => {

  const notifyInfo = () => toast.info("В разработке!",{});

  return (
    <>
      <section className={styles.container}>
        <div className={styles.linksContainer}>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcBusinessman size={24} />
            </div>
            <Link href={`/profile/${session.user.id}`}>{local.settingsSide.account}</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcAdvertising size={24} />
            </div>
            <Link onClick={notifyInfo} href={'/settings'}>{local.settingsSide.notification}</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcPrivacy size={24} />
            </div>
            <Link href={'/terms'}>{local.settingsSide.privacy}</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcFaq size={24} />
            </div>
            <Link href={'/messaging'}>{local.settingsSide.messaging}</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcFullTrash size={24} />
            </div>
            <Link onClick={notifyInfo} href={'/settings'}>{local.settingsSide.closeAcc}</Link>
          </div>
        </div>
        <div className={styles.profile}>
          <Link href={'/main'}>{local.settingsSide.watch}</Link>
        </div>
      </section>
    </>
  )
}