"use client"
import { useStore } from "@/stores/userDataStore"
import { faker } from "@faker-js/faker"
import { useSession } from "next-auth/react"
import Image from 'next/image'
import Link from "next/link"
import { useEffect, useState } from "react"
import { FcAdvertising, FcBusinessman, FcCalendar, FcCollaboration, FcHome, FcNews, FcSettings, FcStackOfPhotos } from "react-icons/fc"
import styles from "./leftUserBlock.module.scss"

export const LeftUserBlock = (props:any) => {
  const [avatar, bg] = useStore((state) => [state.avatar, state.BgImage])
  const { data: session } = useSession();
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    setHydrated(true);
  }, [session])
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
}
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imagesBlock}>
          <div className={styles.bg}>
            {
              bg && <Image
              src={bg}
              sizes="100vw"
              priority={true}
              quality={80}
              alt="bg"
              layout='fill'
              style={{ objectFit: "cover" }}
              className={styles.image}  
            />
            }        
          </div>

        </div>
        <div className={styles.aboutMeBlock}>
          <div className={styles.avatar}>
            {
              avatar &&
              <Image
                src={avatar}
                width={64}
                height={64}
                quality={80}
                style={{ objectFit: "contain" }}
                alt="avatar"
              />
            }
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
            <Link href={'/profile'}>Лента</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcBusinessman size={20} />
            </div>
            <button onClick={()=>{props.setComponent("connections")}}>Связи</button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcNews size={20} />
            </div>
            <Link href={'/news'}>Последние новости</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcCalendar size={20} />
            </div>
            <button onClick={()=>{props.setComponent("celebration")}}>События</button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcCollaboration size={20} />
            </div>
            {/* <Link href={'/profilePage'}>Группы</Link> */}
            <button onClick={()=>{props.setComponent("groups")}}>Группы</button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcStackOfPhotos size={20} />
            </div>
            <button onClick={()=>{props.setComponent("gallery")}}>Галерея</button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcAdvertising size={20} />
            </div>
            <Link href={'/notifications'}>Уведомления</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcSettings size={20} />
            </div>
            <Link href={'/settings'}>Настройки</Link>
          </div>
        </div>
        <div className={styles.viewProfile}>
          <Link className={styles.button} href='/profile'>Смотреть профиль</Link>
        </div>
      </div>
    </>
  )
}

