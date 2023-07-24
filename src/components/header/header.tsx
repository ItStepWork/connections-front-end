import Link from 'next/link'
import { FC } from 'react'
import { SearchInput } from '../forms/search-form/search'
import styles from './header.module.scss'

export const Header: FC = () => {
  return (
    <>
      <header className={styles.container}>
        <div className={styles.contentContainer}>
          <SearchInput />
          <Link href='/loginPage'>Log In</Link>
        </div>
      </header>
    </>
  )
}