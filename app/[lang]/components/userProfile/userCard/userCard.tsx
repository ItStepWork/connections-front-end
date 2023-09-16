"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsBriefcase, BsCalendar2Plus, BsFillPatchCheckFill, BsGeoAlt, BsPencilFill, BsSend } from 'react-icons/bs';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { ComponentName, FriendStatus } from '../../../../../enums/all.enum';
import { UserService } from '../../../../../services/user.service';
import styles from './userCard.module.scss';
import { AiOutlineUserDelete, AiOutlineUsergroupAdd } from 'react-icons/ai';
import Window from '../../messaging/window/page';
import FooterBlock from '../../messaging/footerBlock/page';
import { FriendService } from '../../../../../services/friend.service';
import { GoPersonAdd } from 'react-icons/go';
import { BiTimeFive } from 'react-icons/bi';
import { MdSentimentSatisfiedAlt, MdSentimentVeryDissatisfied } from 'react-icons/md';

export function UserCard(props: any) {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let result = await FriendService.getFriend(props.userId);
    setUser(result);
    setLoading(false);
  }
  const addFriend = async () => {
    await FriendService.addFriend(props.userId);
  }

  const confirmFriend = async () => {
    await FriendService.confirmFriend(props.userId);
  }

  const removeFriend = async () => {
    await FriendService.removeFriend(props.userId);
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
                  <p>? {props.local.profile.friendsCount}</p>
                </div>
              </div>
              {/* <div className=' flex flex-col items-center m-3 gap-3'> */}
              {props.userId !== props.myId
                ? <div className={styles.buttonBlock}>
                  {/* <button className={styles.button_red_BG}>{props.local.profile.connect.delete}</button> */}
                  {user.friendStatus === FriendStatus.Confirmed ? (<button className={styles.button_red_BG} onClick={removeFriend}><AiOutlineUserDelete size={20} />{props.local.profile.connect.delete}</button>) : (<></>)}
                  {user.friendStatus === FriendStatus.Unconfirmed ? (<button className={styles.button_green_BG} onClick={confirmFriend}><MdSentimentSatisfiedAlt size={20} />{props.local.profile.connect.confirm}</button>) : (<></>)}
                  {user.friendStatus === FriendStatus.Unconfirmed ? (<button className={styles.button_red_BG} onClick={removeFriend}><MdSentimentVeryDissatisfied size={20} />{props.local.profile.connect.cancel}</button>) : (<></>)}
                  {user.friendStatus === FriendStatus.Waiting ? (<button className={styles.button_yellow_BG} onClick={removeFriend}><BiTimeFive size={20} />{props.local.profile.connect.cancel}</button>) : (<></>)}
                  {user.friendStatus === FriendStatus.Other ? (<button className={styles.button_green_BG} onClick={addFriend}><GoPersonAdd size={20} />{props.local.profile.connect.beFriends}</button>) : (<></>)}
                  {/* <button className={styles.button_blue_BG} onClick={() => { props.setSelectedUser(props.user); props.setIsOpen(true); }}>{props.local.profile.connect.write}</button> */}
                  {/* <button title="Be Friend" className={styles.button_blue_BG}><AiOutlineUsergroupAdd className={styles.btnPict + " " + styles.bluePict} />"Be Friend"</button> */}
                  <button title="Send Message" className={styles.button_blue_BG} onClick={() => { setIsOpen(true); }}><BsSend size={20} />{props.local.profile.connect.write}</button>
                </div>
                : <div className={styles.buttonBlock}>
                  <Link href='/settings' className={styles.button_red_BG}><span><BsPencilFill size={15} /></span>{props.local.button.editProfile}</Link>
                </div>

              }


            </div>
            {/* </div> */}
            <div className={styles.bottomInfo}>
              <p><span><BsBriefcase /></span>{user.work}</p>
              <p><span><BsGeoAlt /></span>{user.location}</p>
              <p><span><BsCalendar2Plus /></span>{props.local.profile.join} {user.joined}</p>
            </div>
          </div>
          <div className={styles.cardNav}>
            <div {...props.component === ComponentName.AboutMe ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...props.component === ComponentName.AboutMe ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.AboutMe) }}>{props.local.profile.about}</button>
            </div>
            <div {...props.component === ComponentName.Connections ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...props.component === ComponentName.Connections ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.Connections) }}>{props.local.profile.contacts}</button>
            </div>
            <div {...props.component === ComponentName.Groups ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...props.component === ComponentName.Groups ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.Groups) }}>{props.local.profile.groups}</button>
            </div>
            <div {...props.component === ComponentName.Gallery ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...props.component === ComponentName.Gallery ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.Gallery) }}>{props.local.profile.gallery}</button>
            </div>
          </div>
          <Window name={user.firstName + " " + user.lastName} isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className='flex h-5/6 justify-center items-end'>
              <FooterBlock friendId={user.id} />
            </div>
          </Window>
        </div>

      }

    </>
  )
}