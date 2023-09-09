"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsBriefcase, BsCalendar2Plus, BsFillPatchCheckFill, BsGeoAlt, BsPencilFill, BsThreeDots } from 'react-icons/bs';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { ComponentName } from '../../../../../enums/all.enum';
import { UserService } from '../../../../../services/user.service';
import styles from './userCard.module.scss';

export function UserCard(props: any) {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let result = await UserService.getUser(props.userId);
    setUser(result);
    setLoading(false);
  }

  const saveAvatar = async (e: any) => {
    if (e.target.files[0].name.endsWith('.jpg') || e.target.files[0].name.endsWith('.jpeg') || e.target.files[0].name.endsWith('.png')) {

      var formData = new FormData();
      formData.append('file', e.target.files[0]);
      UserService.setUserAvatarImage(formData)
    }
  }

  const saveBackground = async (e: any) => {
    if (e.target.files[0].name.endsWith('.jpg') || e.target.files[0].name.endsWith('.jpeg') || e.target.files[0].name.endsWith('.png')) {

      var formData = new FormData();
      formData.append('file', e.target.files[0])

      UserService.setUserBgImage(formData)
    }
  }

  if (loading) {
    return 'loading';
  }

  return (
    <>
      {user &&
        <div className={styles.container}>
          <div className={styles.bannerImage}>
            {
              user.backgroundUrl &&
              <Image
                src={user.backgroundUrl}
                sizes="100vw"
                quality={80}
                alt="bg"
                layout='fill'
                priority
                style={{ objectFit: "cover" }}
                className={styles.image}
              />
            }
            {props.userId === props.myId &&
              <div className={styles.editBgImage}>
                <label htmlFor="background-file" className={styles.backgroundImageLabel}>
                  <div className={styles.backgroundIcon}>
                    <HiMiniPencilSquare className="fill-white" />
                  </div>
                  <input id="background-file" type="file" className="hidden" onChange={saveBackground} />
                </label>
              </div>
            }
          </div>
          <div className={styles.cardBody}>
            <div className={styles.topInfo}>
              <div className={styles.avatarName}>
                <div className={styles.avatarContainer}>
                  <div className={styles.avatar}>
                    {
                      user.avatarUrl &&
                      <Image
                        src={user.avatarUrl}
                        width='128'
                        height='128'
                        quality={80}
                        style={{ objectFit: "contain" }}
                        alt="avatar"
                        priority
                      />
                    }
                  </div>
                  {props.userId === props.myId &&
                    <div className={styles.editAvatar}>
                      <label htmlFor="avatar-file" className={styles.avatarLabel}>
                        <div className={styles.avatarIcon}>
                          <HiMiniPencilSquare className="fill-white" />
                        </div>
                        <input id="avatar-file" type="file" className="hidden" onChange={saveAvatar} />
                      </label>
                    </div>
                  }

                </div>
                <div className={styles.nameBlock}>
                  <div className={styles.name}>
                    <h2>{user.firstName + ' ' + user.lastName}</h2>
                    <span><BsFillPatchCheckFill size={18} /></span>
                  </div>
                  <p>? связей</p>
                </div>
              </div>
              <div className={styles.buttonBlock}>
                <Link href='/settings' className={styles.buttonLink}><span><BsPencilFill size={15} /></span>Редактировать профиль</Link>
                <button className={styles.button} onClick={() => { }}><BsThreeDots /></button>
              </div>

            </div>
            <div className={styles.bottomInfo}>
              <p><span><BsBriefcase /></span>{user.work}</p>
              <p><span><BsGeoAlt /></span>{user.location}</p>
              <p><span><BsCalendar2Plus /></span>Присоединился: {user.joined}</p>
            </div>
          </div>
          <div className={styles.cardNav}>
            <div {...props.component === ComponentName.AboutMe ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...props.component === ComponentName.AboutMe ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.AboutMe) }}>Обо мне</button>
            </div>
            <div {...props.component === ComponentName.Connections ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...props.component === ComponentName.Connections ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.Connections) }}>Связи</button>
            </div>
            <div {...props.component === ComponentName.Groups ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...props.component === ComponentName.Groups ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.Groups) }}>Сообщества</button>
            </div>
            <div {...props.component === ComponentName.Gallery ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...props.component === ComponentName.Gallery ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.Gallery) }}>Галерея</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}