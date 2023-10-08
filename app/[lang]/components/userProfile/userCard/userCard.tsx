"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { BsBriefcase, BsCalendar2Plus, BsFillPatchCheckFill, BsGeoAlt, BsPencilFill, BsSend } from 'react-icons/bs';
import { GoPersonAdd } from 'react-icons/go';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { MdSentimentSatisfiedAlt, MdSentimentVeryDissatisfied } from 'react-icons/md';
import { ComponentName, FileFormats, FriendStatus } from '../../../../../enums/all.enum';
import { FriendService } from '../../../../../services/friend.service';
import { SubscriptionService } from '../../../../../services/subscription.service';
import { UserService } from '../../../../../services/user.service';
import FooterBlock from '../../messaging/footerBlock/page';
import Window from '../../messaging/window/page';
import OnlineUser from '../../onlineUser/page';
import styles from './userCard.module.scss';
import { CheckService } from '../../../../../services/check.service';
import { toast } from 'react-toastify';

export function UserCard(props: any) {

  const [loading, setLoading] = useState(true);
  const [friendsCount, setSetFriendsCount] = useState(0);
  // const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false)

  const notifyError = () => toast.error(props.local.createGroup.toasts.format, {});
  const notifyErrorServer = () => toast.error(props.local.createGroup.toasts.error, {});
  const notifySuccess = () => toast.success(props.local.createGroup.toasts.ok, {});

  useEffect(() => {
    // getData();
    getFriendsCount();
    setLoading(false);
    return SubscriptionService.subscribeToChannels(props.session.user.accessToken, [
      { path: `Subscription/SubscribeToUserUpdates?id=${props.user.id}`, func: props.getUser },
      { path: `Subscription/SubscribeToFriendsUpdates`, func: getData },
    ]);
  }, []);

  // const getUser = async () => {
  //   let result = await FriendService.getFriend(props.userId);
  //   setUser(result);
  //   // setLoading(false);
  // }
  const getFriendsCount = async () => {
    let result = await FriendService.getFriendsCount(props.user.id);
    setSetFriendsCount(result);
  }
  const getData = async () => {
    await props.getUser();
    await getFriendsCount();
    setLoading(false);
  }
  const addFriend = async () => {
    await FriendService.addFriend(props.user.id);
  }

  const confirmFriend = async () => {
    await FriendService.confirmFriend(props.user.id);
  }

  const removeFriend = async () => {
    await FriendService.removeFriend(props.user.id);
  }

  const saveAvatar = async (e: any) => {
    if (CheckService.imageFormat(e.target.files[0].name)) {
      var formData = new FormData();
      formData.append('file', e.target.files[0]);
      UserService.setUserAvatarImage(formData)
    }
    else notifyError();
  }

  const saveBackground = async (e: any) => {
    if (await CheckService.imageFormat(e.target.files[0].name)) {

      var formData = new FormData();
      formData.append('file', e.target.files[0])

      UserService.setUserBgImage(formData)
    }
    else notifyError();
  }

  if (loading) {
    return 'loading';
  }

  return (
    <>
      {props.user &&
        <div className={styles.container}>
          <div className={styles.bannerImage}>
            {
              props.user.backgroundUrl &&
              <img className='h-full w-full'
                src={props.user.backgroundUrl}
                sizes="100vw"
                alt="bg"
                style={{ objectFit: "cover" }}

              />
            }
          </div>
          {props.user.id === props.session.user.id &&
            <div className={styles.editBgImage}>
              <label htmlFor="background-file" className={styles.backgroundImageLabel}>
                <div className={styles.backgroundIcon}>
                  <HiMiniPencilSquare className="fill-white" />
                </div>
                <input id="background-file" type="file" accept={FileFormats.All} className="hidden" onChange={saveBackground} />
              </label>
            </div>
          }
          <div className={styles.cardBody}>
            <div className={styles.topInfo}>
              <div className={styles.avatarName}>
                <div className={styles.avatarContainer}>
                  <div className={styles.avatar}>
                    {
                      props.user.avatarUrl &&
                      <img className='rounded-full h-full w-full'
                        src={props.user.avatarUrl}
                        style={{ objectFit: "cover" }}
                        alt="avatar"
                      />
                    }
                  </div>
                  {props.user.id === props.session.user.id &&
                    <div className={styles.editAvatar}>
                      <label htmlFor="avatar-file" className={styles.avatarLabel}>
                        <div className={styles.avatarIcon}>
                          <HiMiniPencilSquare className="fill-white" />
                        </div>
                        <input id="avatar-file" type="file" accept={FileFormats.All} className="hidden" onChange={saveAvatar} />
                      </label>
                    </div>
                  }

                </div>
                <div className={styles.nameBlock}>
                  <div className={styles.name}>
                    <h2>{props.user.firstName + ' ' + props.user.lastName}</h2>
                    <span><BsFillPatchCheckFill size={18} /></span>
                  </div>
                  <OnlineUser user={props.user} local={props.local}></OnlineUser>
                  <p>{friendsCount} {props.local.profile.friendsCount}</p>
                </div>
              </div>
              {props.user.id !== props.session.user.id
                ? <div className={styles.buttonBlock}>
                  {props.user.friendStatus === FriendStatus.Confirmed ? (<button className={styles.button_red_BG} onClick={removeFriend}><AiOutlineUserDelete size={20} />{props.local.profile.connect.delete}</button>) : (<></>)}
                  {props.user.friendStatus === FriendStatus.Unconfirmed ? (<button className={styles.button_green_BG} onClick={confirmFriend}><MdSentimentSatisfiedAlt size={20} />{props.local.profile.connect.confirm}</button>) : (<></>)}
                  {props.user.friendStatus === FriendStatus.Unconfirmed ? (<button className={styles.button_red_BG} onClick={removeFriend}><MdSentimentVeryDissatisfied size={20} />{props.local.profile.connect.cancel}</button>) : (<></>)}
                  {props.user.friendStatus === FriendStatus.Waiting ? (<button className={styles.button_yellow_BG} onClick={removeFriend}><BiTimeFive size={20} />{props.local.profile.connect.cancel}</button>) : (<></>)}
                  {props.user.friendStatus === FriendStatus.Other ? (<button className={styles.button_green_BG} onClick={addFriend}><GoPersonAdd size={20} />{props.local.profile.connect.beFriends}</button>) : (<></>)}
                  <button title="Send Message" className={styles.button_blue_BG} onClick={() => { setIsOpen(true); }}><BsSend size={20} />{props.local.profile.connect.write}</button>
                </div>
                : <div className={styles.buttonBlock}>
                  <Link href={`/${props.lang}/settings`} className={styles.button_red_BG}><span><BsPencilFill size={15} /></span>{props.local.button.editProfile}</Link>
                </div>

              }


            </div>
            <div className={styles.bottomInfo}>
              <p><span><BsBriefcase /></span>{props.user.work}</p>
              <p><span><BsGeoAlt /></span>{props.user.location}</p>
              <p><span><BsCalendar2Plus /></span>{props.local.profile.join} {new Date(props.user.createdTime).toDateString()}</p>
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
            <div {...props.component === ComponentName.Posts ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...props.component === ComponentName.Posts ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.Posts) }}>Posts</button>
            </div>
          </div>
          <Window name={props.user.firstName + " " + props.user.lastName} isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className='flex h-5/6 justify-center items-end'>
              <FooterBlock friendId={props.user.id} />
            </div>
          </Window>
        </div>

      }

    </>
  )
}