import Link from 'next/link'
import { FC } from 'react'
import styles from './header.module.scss'

export const Header: FC = () => {

  return (
    <>
      <header className={styles.header}>
        <div >
          <div className={styles.contentContainer}>
            <Link href='/settingsPage'>settings</Link>
            <Link href='/loginPage'>Log In</Link>
          </div>
        </div>
      </header>
    </>
  )
}