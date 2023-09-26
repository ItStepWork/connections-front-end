"use client"
import { faker } from "@faker-js/faker"
import { useSession } from "next-auth/react"
import Image from 'next/image'
import Link from "next/link"
import { useEffect, useState } from "react"
import { FcAdvertising, FcBusinessman, FcCalendar, FcCollaboration, FcHome, FcNews, FcSettings, FcStackOfPhotos } from "react-icons/fc"
import { ComponentName } from "../../../../../enums/all.enum"
import { useStore } from "../../../../../stores/userDataStore"
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
              <h3>{faker.number.int(111)}</h3>
              <div>{props.local.main.header.posts}</div>
            </div>
            <div className={styles.vr}></div>
            <div className={styles.followers}>
              <h3>{faker.number.int(111)}</h3>
              <div>{props.local.main.header.contacts}</div>
            </div>
          </div>
        </div>
        <div className={styles.navigationBlock}>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcHome size={20} />
            </div>
            <button onClick={()=>{props.setComponent(ComponentName.Posts); props.setIsOpen(false);}}>{props.local.main.feed}</button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcBusinessman size={20} />
            </div>
            <button onClick={()=>{props.setComponent(ComponentName.Connections); props.setIsOpen(false);}}>{props.local.main.contacts}</button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcNews size={20} />
            </div>
            <Link href={'/news'}>{props.local.main.news}</Link>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcCalendar size={20} />
            </div>
            <button onClick={()=>{props.setComponent(ComponentName.Celebration); props.setIsOpen(false);}}>{props.local.main.events}</button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcCollaboration size={20} />
            </div>
            {/* <Link href={'/profilePage'}>Группы</Link> */}
            <button onClick={()=>{props.setComponent(ComponentName.Groups); props.setIsOpen(false);}}>{props.local.main.groups}</button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcStackOfPhotos size={20} />
            </div>
            <button onClick={()=>{props.setComponent(ComponentName.Gallery); props.setIsOpen(false);}}>{props.local.main.gallery}</button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcAdvertising size={20} />
            </div>
            <button onClick={()=>{props.setComponent(ComponentName.Notifications); props.setIsOpen(false);}}>{props.local.main.notifications}</button>
          </div>
          <div className={styles.link}>
            <div className={styles.icon}>
              <FcSettings size={20} />
            </div>
            <Link href={'/settings'}>{props.local.main.settings}</Link>
          </div>
        </div>
        <div className={styles.viewProfile}>
          {session ?
            (<Link className={styles.button} href={`/profile/${session.user.id}`}>{props.local.main.profile}</Link>)
            :
            (<></>)
          }
        </div>
      </div>
    </>
  )
}

