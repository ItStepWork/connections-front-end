'use client';
import { NavigationAvatar } from "@/components/header/navigation/navigationAvatar";
import { useStore } from "@/stores/userDataStore";
import { faker } from "@faker-js/faker";
import { signOut } from "next-auth/react";
import Image from 'next/image';
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
}

export const DropMenuProfile: FC<IDrop> = ({navbarOpen}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const notifyLogout = () => toast.info("Вы успешно вышли из аккаунта!",{});
  const toggleMenu = () => { setIsOpen(!isOpen);};

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

  const [avatar, firsName, lastName, work] = useStore((state) => [state.avatar, state.firstName, state.lastName, state.work])
  return (
    <>
      <div className={styles.container} ref={dropdownRef}>
        { navbarOpen ? 
            <button className={styles.navText} onClick={() => {logOut(), notifyLogout()}}>Выход</button> 
          :
          <button className={styles.dropButton} 
          onClick={toggleMenu}
          type="button" 
         >         
            <NavigationAvatar />
          </button>       
        }
          {isOpen &&
            <div className={isOpen ? styles.dropMenu : styles.dropMenuHidden}>
              <div className={styles.avatarContainer}>       
                <div className={styles.avatar}>
                  {
                    avatar &&
                    <Image
                      src={avatar}
                      width={48}
                      height={48}
                      quality={80}
                      style={{ objectFit: "cover" }}
                      alt="avatar"
                      loading="lazy"
                    />
                  }
                </div>
                <div className={styles.textContainer}>
                  <h4>{firsName + ' ' + lastName}</h4>
                  <p>{work}</p>
                </div>
              </div>
              <Link href='/main' className={styles.buttonViewProfile}>Профиль</Link>
              <Link href='/settings'>
                <div className={styles.settingsContainer}>
                  <AiOutlineSetting size={20} />
                  <p>Настройки</p>
                </div>
              </Link>
              <div className={styles.signOutContainer}>
                <BiPowerOff size={20} />
                <button onClick={() => {logOut(), notifyLogout()}}>Выход</button>
              </div>
              <div className={styles.modeContainer}>
                <p>Тема:</p>
                <button className={styles.modeButton}><MdOutlineLightMode /></button>
                <button className={styles.modeButton}><MdOutlineDarkMode /></button>
                <button className={styles.modeButton}><BsCircleHalf /></button>
              </div>
            </div>
          }
        
      </div>
    </>
  )
}