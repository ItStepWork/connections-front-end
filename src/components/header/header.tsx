import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi'
import styles from './header.module.scss'
import { NavigationAvatarButton } from './navigation/navigationAvatarButton'

export const Header: FC = () => {

  return (
    <>
      <header className={styles.header}>
        <div >
          <div className={styles.contentContainer}>
            <Link className={styles.navButton} href='/settingsPage'><AiOutlineSetting size={20} /></Link>
            <Link className={styles.navAvatarButton} href='/profilePage'><NavigationAvatarButton /></Link>
            <Link className={styles.navButton} href='/signinPage'><FiLogIn size={20} /></Link>
          </div>
        </div>
      </header>
    </>
  )
}