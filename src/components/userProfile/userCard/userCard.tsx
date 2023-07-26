import { faker } from '@faker-js/faker';
import Image from 'next/image';
import Link from 'next/link';
import { BsBriefcase, BsCalendar2Plus, BsFillPatchCheckFill, BsGeoAlt, BsPencilFill, BsThreeDots } from 'react-icons/bs';
import styles from './userCard.module.scss';

export const UserCard = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bannerImage}>
          <Image
            src={faker.image.url()}
            fill={true}
            quality={80}
            alt="bg"
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
                    objectFit='contain'
                    alt="avatar"
                  />
                </div>
              </div>
              <div className={styles.nameBlock}>
                <div className={styles.name}>
                  <h2>{faker.person.fullName()}</h2>
                  <span><BsFillPatchCheckFill size={18} /></span>
                </div>
                <p>{faker.number.int(22)} связей</p>
              </div>
            </div>
            <div className={styles.buttonBlock}>
              <Link href='/' className={styles.buttonLink}><span><BsPencilFill size={15} /></span>Редактировать профиль</Link>
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
        </div>
      </div>
    </>
  )
}