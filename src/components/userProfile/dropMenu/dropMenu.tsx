'use client';
import { NavigationAvatar } from "@/components/header/navigation/navigationAvatar";
import { faker } from "@faker-js/faker";
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { BiPowerOff } from "react-icons/bi";
import { BsCircleHalf } from "react-icons/bs";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { signOut } from "next-auth/react"
import styles from './dropMenu.module.scss';

async function logOut(){
  signOut();
}

export const DropMenuProfile: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <button className={styles.dropButton} type="button" onClick={() => setIsOpen((prev) => !prev)}>
          <NavigationAvatar />
        </button>
        {isOpen &&
          <div className={styles.dropMenu}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>
                <Image
                  src={faker.image.avatar()}
                  width={48}
                  height={48}
                  quality={80}
                  objectFit='cover'
                  alt="avatar"
                />
              </div>
              <div className={styles.textContainer}>
                <h4>{faker.person.fullName()}</h4>
                <p>Full-Stack Developer</p>
              </div>
            </div>
            <Link href='/profilePage' className={styles.buttonViewProfile}>Профиль</Link>
            <Link href='/settingsPage'>
              <div className={styles.settingsContainer}>
                <AiOutlineSetting size={20} />
                <p>Настройки</p>
              </div>
            </Link>
            <div className={styles.signOutContainer}>
              <BiPowerOff size={20} />
              <button onClick={logOut}>Выход</button>
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