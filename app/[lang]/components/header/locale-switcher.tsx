'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from "./locale-switcher.module.scss"

export default function LocaleSwitcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className={styles.container}>
      <Link href={redirectedPathName('ua')} locale={'ua'}>
        <img src="/UA.png" alt="ua" />
      </Link>     
      <Link href={redirectedPathName('en')} locale={'en'} >
        <img src="/GB.png" alt="en" />
      </Link>
    </div>
  )
}
