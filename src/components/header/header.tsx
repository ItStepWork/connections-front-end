import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import styles from './header.module.scss'
import { NavigationAvatarButton } from './navigation/navigationAvatarButton'
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

async function logOut(){
  signOut();
}

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
            <Link className={styles.navButton} href='/settingsPage'><AiOutlineSetting size={20} /></Link>
            <Link className={styles.navAvatarButton} href='/profilePage'><NavigationAvatarButton /></Link>
            {session?.user? (<button className={styles.navButton} onClick={logOut}><FiLogOut size={20} /></button>):(<Link className={styles.navButton} href='/signinPage'><FiLogIn size={20} /></Link>)}
          </div>
        </div>
      </header>
    </>
  )
}