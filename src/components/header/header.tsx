import Link from 'next/link'
import { FC } from 'react'
import { SearchInput } from '../forms/search-form/search'
import styles from './header.module.scss'
import { Navigation } from './navigation/navigation'

export const Header: FC = () => {
  return (
    <>
      <header className={styles.container}>
        <div className={styles.contentContainer}>
          <SearchInput />
          <Navigation />
          <Link href='/loginPage'>Log In</Link>
        </div>
      </header>
    </>
  )
}