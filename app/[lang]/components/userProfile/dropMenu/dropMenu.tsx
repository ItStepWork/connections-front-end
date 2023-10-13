'use client';

import { useSession } from 'next-auth/react'
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { BiPowerOff } from "react-icons/bi";
import { BsCircleHalf } from "react-icons/bs";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { toast } from "react-toastify";
import styles from './dropMenu.module.scss';

async function logOut() {
  signOut();
}

interface IDrop {
  navbarOpen: boolean;
  local : any;
  lang: any
}

export const DropMenuProfile: FC<IDrop> = ({navbarOpen, local, lang}) => {
  
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const notifyLogout = () => toast.info(local.header.dropMenu.exitAccount,{});
  const toggleMenu = () => { setIsOpen(!isOpen);};
  const {theme, setTheme} = useTheme()

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className={styles.container} ref={dropdownRef}>
        { navbarOpen ? 
            <button className={styles.navText} onClick={() => {logOut(), notifyLogout()}}>{local.header.dropMenu.exit}</button> 
          :
          <button className={styles.dropButton} 
          onClick={toggleMenu}
          type="button" 
         >         
            {session?.user.avatarUrl && <img className='h-10 w-10' src={session.user.avatarUrl}></img>}
          </button>       
        }
          {isOpen &&
            <div className={isOpen ? styles.dropMenu : styles.dropMenuHidden}>
              <div className={styles.avatarContainer}>       
                <div className={styles.avatar}>
                  {
                    session?.user.avatarUrl &&
                    <img className='h-12 w-12' src={session.user.avatarUrl}></img>
                  }
                </div>
                <div className={styles.textContainer}>
                  <h4>{session?.user.firstName + ' ' + session?.user.lastName}</h4>
                  <p>{session?.user.work}</p>
                </div>
              </div>
              <Link href={`/${lang}/main`} className={styles.buttonViewProfile}>{local.header.dropMenu.profile}</Link>
              <Link href={`/${lang}/settings`}>
                <div className={styles.settingsContainer}>
                  <AiOutlineSetting size={20} />
                  <p>{local.header.dropMenu.settings}</p>
                </div>
              </Link>
              <div className={styles.signOutContainer}>
                <BiPowerOff size={20} />
                <button onClick={() => {logOut(), notifyLogout()}}>{local.header.dropMenu.exit}</button>
              </div>
              {
                /*
                <div className={styles.modeContainer}>
                <p>Тема:</p>
                <button className={styles.modeButton} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}><MdOutlineLightMode /></button>
                <button className={styles.modeButton} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><MdOutlineDarkMode /></button>
                <button className={styles.modeButton}><BsCircleHalf /></button>
                </div>
                */
              }
            </div>
          }     
      </div>
    </>
  )
}