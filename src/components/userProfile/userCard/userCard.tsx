"use client"
import { useStore } from '@/stores/userDataStore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { BsBriefcase, BsCalendar2Plus, BsFillPatchCheckFill, BsGeoAlt, BsPencilFill, BsThreeDots } from 'react-icons/bs';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import styles from './userCard.module.scss';

export function UserCard(props: any) {

  const [avatar, bg, firstName, lastName, joined, work, location, friendsCount] = useStore((state) => 
  [state.avatar, state.BgImage, state.firstName, state.lastName, state.joined, state.work, state.location, state.friendsCount])

  const { data: session } = useSession();

  const saveAvatar = async (e: any) => {
    if(session?.user.accessToken != null){
      if(e.target.files[0].name.endsWith('.jpg') || e.target.files[0].name.endsWith('.jpeg') || e.target.files[0].name.endsWith('.png')){
  
        var formData = new FormData();
        formData.append('file', e.target.files[0]);
        const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "User/SaveAvatar", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + session.user.accessToken
          },
          body: formData,
        });
    
        if (response.ok) {
          let result = await response.json();
        }
      }
    }
  }

  const saveBackground = async (e: any) => {
    if(session?.user.accessToken != null){
      if(e.target.files[0].name.endsWith('.jpg') || e.target.files[0].name.endsWith('.jpeg') || e.target.files[0].name.endsWith('.png')){
  
        var formData = new FormData();
        formData.append('file', e.target.files[0]);
        const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "User/SaveBackground", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + session.user.accessToken
          },
          body: formData,
        });
    
        if (response.ok) {
          let result = await response.json();
        }
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.bannerImage}>
          <Image
            src={bg}
            sizes="100vw"
            priority={true}
            quality={80}
            alt="bg"
            layout='fill'
            style={{ objectFit: "cover" }}
            className={styles.image}
          />
          <div className='absolute ml-5 mt-5'>
            <label htmlFor="background-file" className="flex rounded-full cursor-pointer transition-all duration-300 bg-buttonBlue bg-opacity-60 hover:bg-opacity-100">
              <div className="flex p-1 md:p-2 lg:p-3">
                <HiMiniPencilSquare className="fill-white" />
              </div>
              <input id="background-file" type="file" className="hidden" onChange={saveBackground} />
            </label>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.topInfo}>
            <div className={styles.avatarName}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  <Image
                    src={avatar}
                    width='128'
                    height='128'
                    quality={80}
                    style={{ objectFit: "contain" }}
                    alt="avatar"
                  />
                </div>
                <div className='absolute ml-12 mt-7 md:ml-28 md:mt-16 lg:ml-28 lg:mt-14'>
                  <label htmlFor="avatar-file" className="flex rounded-full cursor-pointer transition-all duration-300 bg-buttonBlue bg-opacity-60 hover:bg-opacity-100">
                    <div className="flex p-1 md:p-2 lg:p-3">
                      <HiMiniPencilSquare className="fill-white" />
                    </div>
                    <input id="avatar-file" type="file" className="hidden" onChange={saveAvatar} />
                  </label>
                </div>
              </div>
              <div className={styles.nameBlock}>
                <div className={styles.name}>
                  <h2>{firstName + ' ' + lastName}</h2>
                  <span><BsFillPatchCheckFill size={18} /></span>
                </div>
                <p>{friendsCount} связей</p>
              </div>
            </div>
            <div className={styles.buttonBlock}>
              <Link href='/settings' className={styles.buttonLink}><span><BsPencilFill size={15} /></span>Редактировать профиль</Link>
              <button className={styles.button}><BsThreeDots /></button>
            </div>

          </div>
          <div className={styles.bottomInfo}>
            <p><span><BsBriefcase /></span>{work}</p>
            <p><span><BsGeoAlt /></span>{location}</p>
            <p><span><BsCalendar2Plus /></span>Присоединился: {joined}</p>
          </div>
        </div>
        <div className={styles.cardNav}>
          <Link className={styles.link} href='/'>Посты</Link>
          <Link className={styles.link} href='/aboutMe'>Обо мне</Link>
          <div className={styles.counterLink}>
            <button className={styles.linkUnderline} onClick={()=>{props.setComponent("connections")}}>Связи</button>
            <div className={styles.counter}>{friendsCount}</div>
          </div>
          <Link className={styles.link} href='/'>Медиа</Link>
          <Link className={styles.link} href='/'>Видео</Link>
          <Link className={styles.link} href='/'>Активность</Link>
          <button className={styles.link} onClick={()=>{props.setComponent("groups")}}>Сообщества</button>
        </div>
      </div>
    </>
  )
}