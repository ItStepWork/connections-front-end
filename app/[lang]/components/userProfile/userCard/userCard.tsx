"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { BsBriefcase, BsCalendar2Plus, BsFillPatchCheckFill, BsGeoAlt, BsPencilFill, BsSend } from 'react-icons/bs';
import { GoPersonAdd } from 'react-icons/go';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { MdSentimentSatisfiedAlt, MdSentimentVeryDissatisfied } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ComponentName, FileFormats, FriendStatus } from '../../../../../enums/all.enum';
import { CheckService } from '../../../../../services/check.service';
import { FriendService } from '../../../../../services/friend.service';
import { SubscriptionService } from '../../../../../services/subscription.service';
import { UserService } from '../../../../../services/user.service';
import FooterBlock from '../../messaging/footerBlock/page';
import Window from '../../messaging/window/page';
import OnlineUser from '../../onlineUser/page';
import styles from './userCard.module.scss';

export function UserCard(props: any) {

  const {
    component,
    getUser,
    lang,
    local,
    session,
    setComponent,
    user
  } = props;

  const [loading, setLoading] = useState(true);
  const [friendsCount, setSetFriendsCount] = useState(0);
  // const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false)

  const notifyError = () => toast.error(local.createGroup.toasts.format, {});

  useEffect(() => {
    // getData();
    getFriendsCount();
    setLoading(false);
    return SubscriptionService.subscribeToChannels(session.user.accessToken, [
      { path: `Subscription/SubscribeToUserUpdates?id=${user.id}`, func: getUser },
      { path: `Subscription/SubscribeToFriendsUpdates`, func: getData },
    ]);
  }, []);

  const getFriendsCount = async () => {
    let result = await FriendService.getFriendsCount(user.id);
    setSetFriendsCount(result);
  }
  const getData = async () => {
    await getUser();
    await getFriendsCount();
    setLoading(false);
  }
  const addFriend = async () => {
    await FriendService.addFriend(user.id);
  }

  const confirmFriend = async () => {
    await FriendService.confirmFriend(user.id);
  }

  const removeFriend = async () => {
    await FriendService.removeFriend(user.id);
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
      {user &&
        <div className={styles.container}>
          <div className={styles.bannerImage}>
            {
              user.backgroundUrl &&
              <img className='h-full w-full'
                src={user.backgroundUrl}
                sizes="100vw"
                alt="bg"
                style={{ objectFit: "cover" }}

              />
            }
          </div>
          {user.id === session.user.id &&
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
                      user.avatarUrl &&
                      <img className='rounded-full h-full w-full'
                        src={user.avatarUrl}
                        style={{ objectFit: "cover" }}
                        alt="avatar"
                      />
                    }
                  </div>
                  {user.id === session.user.id &&
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
                    <h2>{user.firstName + ' ' + user.lastName}</h2>
                    <span><BsFillPatchCheckFill size={18} /></span>
                  </div>
                  <OnlineUser user={user} local={local}></OnlineUser>
                  <p>{friendsCount} {local.profile.friendsCount}</p>
                </div>
              </div>
              {user.id !== session.user.id
                ? <div className={styles.buttonBlock}>
                  {user.friendStatus === FriendStatus.Confirmed ? (<button className={styles.button_red_BG} onClick={removeFriend}><AiOutlineUserDelete size={20} />{local.profile.connect.delete}</button>) : (<></>)}
                  {user.friendStatus === FriendStatus.Unconfirmed ? (<button className={styles.button_green_BG} onClick={confirmFriend}><MdSentimentSatisfiedAlt size={20} />{local.profile.connect.confirm}</button>) : (<></>)}
                  {user.friendStatus === FriendStatus.Unconfirmed ? (<button className={styles.button_red_BG} onClick={removeFriend}><MdSentimentVeryDissatisfied size={20} />{local.profile.connect.cancel}</button>) : (<></>)}
                  {user.friendStatus === FriendStatus.Waiting ? (<button className={styles.button_yellow_BG} onClick={removeFriend}><BiTimeFive size={20} />{local.profile.connect.cancel}</button>) : (<></>)}
                  {user.friendStatus === FriendStatus.Other ? (<button className={styles.button_green_BG} onClick={addFriend}><GoPersonAdd size={20} />{local.profile.connect.beFriends}</button>) : (<></>)}
                  <button title="Send Message" className={styles.button_blue_BG} onClick={() => { setIsOpen(true); }}><BsSend size={20} />{local.profile.connect.write}</button>
                </div>
                : <div className={styles.buttonBlock}>
                  <Link href={`/${lang}/settings`} className={styles.button_red_BG}><span><BsPencilFill size={15} /></span>{local.button.editProfile}</Link>
                </div>

              }


            </div>
            <div className={styles.bottomInfo}>
              <p><span><BsBriefcase /></span>{user.work}</p>
              <p><span><BsGeoAlt /></span>{user.location}</p>
              <p><span><BsCalendar2Plus /></span>{local.profile.join} {new Date(user.createdTime).toLocaleDateString()}</p>
            </div>
          </div>
          <div className={styles.cardNav}>
            <div {...component === ComponentName.AboutMe ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...component === ComponentName.AboutMe ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.AboutMe) }}>{local.profile.about}</button>
            </div>
            <div {...component === ComponentName.Connections ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...component === ComponentName.Connections ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Connections) }}>{local.profile.contacts}</button>
            </div>
            <div {...component === ComponentName.Groups ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...component === ComponentName.Groups ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Groups) }}>{local.profile.groups}</button>
            </div>
            <div {...component === ComponentName.Gallery ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...component === ComponentName.Gallery ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Gallery) }}>{local.profile.gallery}</button>
            </div>
            <div {...component === ComponentName.Posts ? { className: `${styles.counterLink}` } : { className: "" }} >
              <button {...component === ComponentName.Posts ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Posts) }}>{local.groups.posts}</button>
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