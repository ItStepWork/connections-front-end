"use client"
import { faker } from '@faker-js/faker';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { BsBriefcase, BsCalendar2Plus, BsFillPatchCheckFill, BsGeoAlt, BsPencilFill, BsThreeDots } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai'
import { BiSolidUserCheck } from 'react-icons/bi'
import styles from './groupCard.module.scss';

export function GroupCard(props: any) {
  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.bannerImage}>
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
        </div> */}
        <div className={styles.cardBody}>
          <div className={styles.topInfo}>
            <div className={styles.avatarName}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  <Image
                    src={props.group.pictureUrl}
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
                  <h2>{props.group.name}</h2>
                  <span><BsFillPatchCheckFill size={18} /></span>
                </div>
                <p> {props.group.audience}</p>
              </div>
            </div>
            <div className={styles.buttonBlock}>
              <button className={styles.blueButton}><BiSolidUserCheck size={16} />Joined</button>
              <button className={styles.greenButton}><AiOutlinePlus />Invite</button>
            </div>

          </div>

          <div className={styles.membesContainer}>
            <div className={styles.members}>
              <div className="w-4"><img className={styles.memberIco} src={faker.image.avatar()}></img></div>
              <div className="w-4"><img className={styles.memberIco} src={faker.image.avatar()}></img></div>
              <div className="w-4"><img className={styles.memberIco} src={faker.image.avatar()}></img></div>
              <div className="w-4"><img className={styles.memberIco} src={faker.image.avatar()}></img></div>
              <div className="w-4"><div className={styles.membersDiv}>+12</div></div>
            </div>

            <div className={styles.membersNames}>
              <p>{faker.person.fullName()}, {faker.person.fullName()}, {faker.person.fullName()}</p>
            </div>

          </div>

        </div>
        <div className={styles.cardNav}>
          <Link className={styles.link} href='/'>Посты</Link>
          <Link className={styles.link} href='/aboutMePage'>Обо мне</Link>
          <div className={styles.counterLink}>
            <button className={styles.linkUnderline} onClick={() => { props.setComponent("connections") }}>Связи</button>
            <div className={styles.counter}>{faker.number.int(322)}</div>
          </div>
          <Link className={styles.link} href='/'>Медиа</Link>
          <Link className={styles.link} href='/'>Видео</Link>
          <Link className={styles.link} href='/'>Активность</Link>
          <button className={styles.link} onClick={() => { props.setComponent("groups") }}>Сообщества</button>
        </div>
      </div>
    </>
  )
}