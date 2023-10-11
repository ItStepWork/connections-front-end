import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import { FriendStatus } from '../../../../../enums/all.enum';
import { FriendService } from '../../../../../services/friend.service';
import OnlineUser from '../../onlineUser/page';
import styles from './connectionBlock.module.scss';

export const ConnectionBlock = (props: any) => {

  const {
    myId,
    user,
    setSelectedUser,
    setIsOpen,
    local,
    lang
  } = props

  const addFriend = async () => {
    await FriendService.addFriend(user.id);
  }

  const confirmFriend = async () => {
    await FriendService.confirmFriend(user.id);
  }

  const removeFriend = async () => {
    await FriendService.removeFriend(user.id);
  }

  return (
    <>
      <div className={styles.container}>
        <Link className={styles.userContainer} href={`/${lang}/profile/${user.id}`}>
          {user.avatarUrl ? (
            <img src={user.avatarUrl} className={styles.avatar} alt="avatar"></img>
          ) : (<FaUserCircle className={styles.avatar} />)}
          <div className={styles.textContainer}>
            <div className={styles.headerText}>
              <span>{user.firstName} {user.lastName}</span>
              <span>{user.FamilyStatus}</span>
            </div>
            <OnlineUser user={user} local={local}></OnlineUser>
            <div className={styles.description}>{user.aboutMe}</div>

          </div>
        </Link>
        {(myId !== user.id) &&
          <div className={styles.buttonsContainer}>
            {user.friendStatus === FriendStatus.Confirmed ? (<button className={styles.button_red_BG} onClick={removeFriend}>{local.profile.connect.delete}</button>) : (<></>)}
            {user.friendStatus === FriendStatus.Unconfirmed ? (<button className={styles.button_green_BG} onClick={confirmFriend}>{local.profile.connect.confirm}</button>) : (<></>)}
            {user.friendStatus === FriendStatus.Unconfirmed ? (<button className={styles.button_red_BG} onClick={removeFriend}>{local.profile.connect.cancel}</button>) : (<></>)}
            {user.friendStatus === FriendStatus.Waiting ? (<button className={styles.button_red_BG} onClick={removeFriend}>{local.profile.connect.cancel}</button>) : (<></>)}
            {user.friendStatus === FriendStatus.Other ? (<button className={styles.button_green_BG} onClick={addFriend}>{local.profile.connect.beFriends}</button>) : (<></>)}
            <button className={styles.button_blue_BG} onClick={() => { setSelectedUser(user); setIsOpen(true); }}>{local.profile.connect.write}</button>
          </div>
        }

      </div>
    </>
  )
}