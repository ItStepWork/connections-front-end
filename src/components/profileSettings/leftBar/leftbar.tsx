import Link from "next/link"
import { FC } from "react"
import { FcAdvertising, FcBusinessman, FcFaq, FcFullTrash, FcPrivacy } from 'react-icons/fc'
import styles from "./leftBar.module.scss"

export const LeftBar: FC = () => {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.linksContainer}>
          <div className={styles.link}>
            <FcBusinessman />
            <Link href={'/'}>Аккаунт</Link>
          </div>
          <div className={styles.link}>
            <FcAdvertising />
            <Link href={'/'}>Оповещения</Link>
          </div>
          <div className={styles.link}>
            <FcPrivacy />
            <Link href={'/'}>Приватность и защита</Link>
          </div>
          <div className={styles.link}>
            <FcFaq />
            <Link href={'/'}>Обмен сообщениями</Link>
          </div>
          <div className={styles.link}>
            <FcFullTrash />
            <Link href={'/'}>Закрыть аккаунт</Link>
          </div>
        </div>
        <div className={styles.profile}>
          Смотреть профиль
        </div>
      </section>
    </>
  )
}