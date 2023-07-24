import Link from 'next/link'
import { FC } from 'react'
import styles from './header.module.scss'

export const Header: FC = () => {
  return (
    <>
      <header className={styles.container}>
        <div className={styles.contentContainer}>
          <Link href='/loginPage'>Log In</Link>
        </div>
      </header>
    </>
  )
}