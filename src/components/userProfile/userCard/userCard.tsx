import { authConfig } from '@/configs/auth';
import { faker } from '@faker-js/faker';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { BsBriefcase, BsCalendar2Plus, BsFillPatchCheckFill, BsGeoAlt, BsPencilFill, BsThreeDots } from 'react-icons/bs';
import styles from './userCard.module.scss';

export const UserCard: FC = async () => {

  const data = await getServerSession(authConfig);
  console.log(data)

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
                  <h2>{data?.user?.firstName + ' ' + data?.user?.lastName}</h2>
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
            <p><span><BsBriefcase /></span> Lead Developer</p>
            <p><span><BsGeoAlt /></span> New Hampshire</p>
            <p><span><BsCalendar2Plus /></span>Присоединился: 26 Октября, 2019</p>
          </div>
        </div>
        <div className={styles.cardNav}>
          <Link className={styles.link} href='/'>Посты</Link>
          <Link className={styles.link} href='/'>Обо мне</Link>
          <div className={styles.counterLink}>
            <Link className={styles.link} href='/'>Связи</Link>
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