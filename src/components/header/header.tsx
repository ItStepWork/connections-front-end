import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi'
import styles from './header.module.scss'
import { NavigationAvatar } from './navigation/navigationAvatar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const Header: FC = () => {

  const router = useRouter();

  const { data: session } = useSession();
  if (session === null) {
    router.push("/signinPage");
  }

  return (
    <>
      <header className={styles.header}>
        <div >
          <div className={styles.contentContainer}>
            <Link className={styles.navText} href='/profilePage'>Мой профиль</Link>
            <Link className={styles.navButton} href='/settingsPage'><AiOutlineSetting size={20} /></Link>
            <Link className={styles.navAvatarButton} href='/profilePage'><NavigationAvatar /></Link>
            <Link className={styles.navButton} href='/signinPage'><FiLogIn size={20} /></Link>
          </div>
        </div>
      </header>
    </>
  )
}