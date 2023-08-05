import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi'
import { MdOutlineMessage } from 'react-icons/md'
import { DropMenuProfile } from '../userProfile/dropMenu/dropMenu'
import styles from './header.module.scss'

export const Header: FC = () => {

  const { data: session } = useSession();

  return (
    <>
      <header className={styles.header}>
        <div >
          <div className={styles.contentContainer}>
            {session ?
              (<>
                <Link className={styles.navText} href='/main'>Главная</Link>
                <Link className={styles.navText} href='/profile'>Мой профиль</Link>
                <Link className={styles.navButton} href='/messaging'><MdOutlineMessage size={20} /></Link>
                <Link className={styles.navButton} href='/settings'><AiOutlineSetting size={20} /></Link>
                <DropMenuProfile />
              </>)
              :
              (<Link className={styles.navButton} href='/signIn'><FiLogIn size={20} /></Link>)}
          </div>
        </div>
      </header>
    </>
  )
}