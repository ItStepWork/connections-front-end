"use client"
import { useStore } from '@/stores/userDataStore'
import { useSession } from 'next-auth/react'
import localFont from "next/font/local"
import Link from 'next/link'
import { FC, useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiMenu } from 'react-icons/bi'
import { FiLogIn } from 'react-icons/fi'
import { MdOutlineClose, MdOutlineMessage } from 'react-icons/md'
import { DropMenuProfile } from '../userProfile/dropMenu/dropMenu'
import styles from './header.module.scss'

const arenq = localFont({ 
  src: '../../fonts/Arenq.otf',
  variable: "--logo-font",
})
const lombok = localFont({ src: '../../fonts/Lombok Regular.ttf'})
const oneDay = localFont({ src: '../../fonts/ONEDAY.ttf'})

export const Header: FC = () => {
  const [fetch] = useStore((state) => [state.fetchUser])
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={styles.header} onLoad={fetch}>
        <div >
          <div className={styles.contentContainer}>
          <Link href="http://localhost:3000/" className={styles.logoLink}>
              <span className={styles.logo}><p className={oneDay.className}>Connections</p></span>
          </Link>
            {session ?
              (<>
                <div className={styles.burgerButton} onClick={() => setOpen(!open)}>{open ? <MdOutlineClose size={24} /> : <BiMenu size={24}/>}        
                </div>   
                    <ul className={`md:flex md:items-center md:pb-0 pb-12 dark:shadow-customTransparent dark:backdrop-blur-[3px] md:backdrop-blur-0 absolute rounded-lg md:static md:z-auto z-[-10] left-4 w-11/12 md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in bg-white md:dark:bg-transparent dark:bg-dark_button_BG ${open ? 'top-14 opacity-100' : 'top-[-500px] md:opacity-100 opacity-0'}`}>
                      <li className={styles.listItem}>
                        <Link className={ styles.navText} onClick={fetch} href='/main'>Главная</Link>    
                      </li>
                      <li className={styles.listItem}>
                        <Link className={styles.navText} onClick={fetch} href='/profile'>Мой профиль</Link>
                      </li>
                      <li className={styles.listItem}>
                        <Link className={open ? styles.navText : styles.navButton} onClick={fetch} href='/messaging'>{open ? 'Сообщения' : <MdOutlineMessage size={20} />}</Link>
                      </li>
                      <li className={styles.listItem}>
                        <Link className={open ? styles.navText : styles.navButton} onClick={fetch} href='/settings'>{open ? 'Параметры профиля' : <AiOutlineSetting size={20} />}</Link>
                      </li>
                      <li className={styles.listItem}>
                        <DropMenuProfile navbarOpen={open} />
                      </li>
                    </ul>
                  
              </>)
              :
              (<Link className={styles.navButton} href='/signIn'><FiLogIn size={20} /></Link>)}
          </div>
        </div>
      </header>
    </>
  )
}