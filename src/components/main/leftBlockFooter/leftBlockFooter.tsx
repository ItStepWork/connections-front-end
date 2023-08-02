import Link from "next/link"
import { BiCopyright } from "react-icons/bi"
import styles from "./leftBlockFooter.module.scss"
export const LeftBlockFooter = () => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.Line}>
          <Link className={styles.anim} href='/aboutUsPage'>О нас</Link>
          <Link className={styles.anim} href='/settingsPage'>Настройки</Link>
          <Link className={styles.anim} href='/helpPage'>Помощь</Link>
        </div>
        <div className={styles.Line}>
          <Link className={styles.anim} href='/privacyPage'>Конфедициальность и условия</Link>
        </div>
        <div className={styles.Line}>
          <BiCopyright />
          <p>2023 Connections</p>
        </div>
      </div>
    </>
  )
}