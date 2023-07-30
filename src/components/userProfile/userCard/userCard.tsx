"use client"
import { faker } from '@faker-js/faker';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { BsBriefcase, BsCalendar2Plus, BsFillPatchCheckFill, BsGeoAlt, BsPencilFill, BsThreeDots } from 'react-icons/bs';
import styles from './userCard.module.scss';

export const UserCard: FC = () => {

  const { data: session } = useSession();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.bannerImage}>
          <Image
            src={faker.image.url()}

            sizes="100vw"
            priority={true}
            quality={80}
            alt="bg"
            layout='fill'
            style={{ objectFit: "cover" }}
            className={styles.image}
          />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.topInfo}>
            <div className={styles.avatarName}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  <Image
                    src={faker.image.avatar()}
                    width={128}
                    height={128}
                    quality={80}
                    style={{ objectFit: "contain" }}
                    alt="avatar"
                  />
                </div>
              </div>
              <div className={styles.nameBlock}>
                <div className={styles.name}>
                  <h2>{session?.user?.firstName + ' ' + session?.user?.lastName}</h2>
                  <span><BsFillPatchCheckFill size={18} /></span>
                </div>
                <p>{faker.number.int(22)} связей</p>
              </div>
            </div>
            <div className={styles.buttonBlock}>
              <Link href='/settingsPage' className={styles.buttonLink}><span><BsPencilFill size={15} /></span>Редактировать профиль</Link>
              <button className={styles.button}><BsThreeDots /></button>
            </div>

          </div>
          <div className={styles.bottomInfo}>
            <p><span><BsBriefcase /></span>{session?.user?.work}</p>
            <p><span><BsGeoAlt /></span>{session?.user?.location}</p>
            <p><span><BsCalendar2Plus /></span>Присоединился: {session?.user?.joined}</p>
          </div>
        </div>
        <div className={styles.cardNav}>
          <Link className={styles.link} href='/'>Посты</Link>
          <Link className={styles.link} href='/aboutMePage'>Обо мне</Link>
          <div className={styles.counterLink}>
            <Link className={styles.linkUnderline} href='/profilePage'>Связи</Link>
            <div className={styles.counter}>{faker.number.int(322)}</div>
          </div>
          <Link className={styles.link} href='/'>Медиа</Link>
          <Link className={styles.link} href='/'>Видео</Link>
          <Link className={styles.link} href='/'>Активность</Link>
          <Link className={styles.link} href='/groupsPage'>Сообщества</Link>
        </div>
      </div>
    </>
  )
}