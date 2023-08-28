"use client"
import Link from "next/link"
import { FC } from "react"
import { FcAdvertising, FcBusinessman, FcFaq, FcFullTrash, FcPrivacy } from 'react-icons/fc'
import { toast } from "react-toastify"
import styles from './leftSettingsMenu.module.scss'
export const LeftSettingsMenu: FC = () => {

  const notifyInfo = () => toast.info("В разработке!",{});

  return (
    <>
      <section className={styles.container}>
        <div className={styles.linksContainer}>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcBusinessman size={24} />
            </div>
            <Link onClick={notifyInfo} href={'/settings'}>Аккаунт</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcAdvertising size={24} />
            </div>
            <Link onClick={notifyInfo} href={'/settings'}>Оповещения</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcPrivacy size={24} />
            </div>
            <Link onClick={notifyInfo} href={'/settings'}>Приватность и защита</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcFaq size={24} />
            </div>
            <Link onClick={notifyInfo} href={'/settings'}>Обмен сообщениями</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcFullTrash size={24} />
            </div>
            <Link onClick={notifyInfo} href={'/settings'}>Закрыть аккаунт</Link>
          </div>
        </div>
        <div className={styles.profile}>
          <Link onClick={notifyInfo} href={'/main'}>Смотреть профиль</Link>
        </div>
      </section>
    </>
  )
}