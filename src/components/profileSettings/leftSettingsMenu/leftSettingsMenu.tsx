import Link from "next/link"
import { FC } from "react"
import { FcAdvertising, FcBusinessman, FcFaq, FcFullTrash, FcPrivacy } from 'react-icons/fc'
import styles from './leftSettingsMenu.module.scss'
export const LeftSettingsMenu: FC = () => {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.linksContainer}>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcBusinessman size={24} />
            </div>
            <Link href={'/profile'}>Аккаунт</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcAdvertising size={24} />
            </div>
            <Link href={'/'}>Оповещения</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcPrivacy size={24} />
            </div>
            <Link href={'/'}>Приватность и защита</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcFaq size={24} />
            </div>
            <Link href={'/'}>Обмен сообщениями</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcFullTrash size={24} />
            </div>
            <Link href={'/'}>Закрыть аккаунт</Link>
          </div>
        </div>
        <div className={styles.profile}>
          <Link href='/profile'>Смотреть профиль</Link>
        </div>
      </section>
    </>
  )
}