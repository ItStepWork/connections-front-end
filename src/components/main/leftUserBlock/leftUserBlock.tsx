"use client"
import { faker } from "@faker-js/faker"
import { useSession } from "next-auth/react"
import Image from 'next/image'
import Link from "next/link"
import { FcAdvertising, FcBusinessman, FcCalendar, FcCollaboration, FcHome, FcNews, FcSettings } from "react-icons/fc"
import styles from "./leftUserBlock.module.scss"

export const LeftUserBlock = () => {

  const { data: session } = useSession();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imagesBlock}>
          <div className={styles.bg}>
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

        </div>
        <div className={styles.aboutMeBlock}>
          <div className={styles.avatar}>
            <Image
              src={faker.image.avatar()}
              width={64}
              height={64}
              quality={80}
              style={{ objectFit: "contain" }}
              alt="avatar"
            />
          </div>
          <h3>{session?.user?.firstName + ' ' + session?.user?.lastName}</h3>
          <div className={styles.work}>{session?.user?.work}</div>
          <div className={styles.aboutMe}>{session?.user?.aboutMe}</div>
          <div className={styles.followsBlock}>
            <div className={styles.followers}>
              <h3 >{faker.number.int(111)}</h3>
              <div >Посты</div>
            </div>
            <div className={styles.vr}></div>
            <div className={styles.followers}>
              <h3>{faker.number.int(111)}</h3>
              <div>Подписчики</div>
            </div>
            <div className={styles.vr}></div>
            <div className={styles.followers}>
              <h3>{faker.number.int(111)}</h3>
              <div>Подписки</div>
            </div>
          </div>
        </div>
        <div className={styles.navigationBlock}>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcHome size={20} />
            </div>
            <Link href={'/profilePage'}>Лента</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcBusinessman size={20} />
            </div>
            <Link href={'/profilePage'}>Связи</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcNews size={20} />
            </div>
            <Link href={'/newsPage'}>Последние новости</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcCalendar size={20} />
            </div>
            <Link href={'/eventsPage'}>События</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcCollaboration size={20} />
            </div>
            <Link href={'/groupsPage'}>Группы</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcAdvertising size={20} />
            </div>
            <Link href={'/notificationsPage'}>Уведомления</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcSettings size={20} />
            </div>
            <Link href={'/settingsPage'}>Настройки</Link>
          </div>
        </div>
        <div className={styles.viewProfile}>
          <Link className={styles.button} href='/profilePage'>Смотреть профиль</Link>
        </div>
      </div>
    </>
  )
}

