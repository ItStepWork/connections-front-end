import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import { FriendStatus } from '../../../../../enums/all.enum';
import { FriendService } from '../../../../../services/friend.service';
import OnlineUser from '../../onlineUser/page';
import styles from './connectionBlock.module.scss';

export const ConnectionBlock = (props: any) => {
  const addFriend = async () => {
    await FriendService.addFriend(props.user.id);
  }

  const confirmFriend = async () => {
    await FriendService.confirmFriend(props.user.id);
  }

  const removeFriend = async () => {
    await FriendService.removeFriend(props.user.id);
  }

  return (
    <>
      <div className={styles.container}>
        <Link className={styles.userContainer} href={`/profile/${props.user.id}`}>
          {props.user.avatarUrl ? (
            <img src={props.user.avatarUrl} className={styles.avatar} alt="avatar"></img>
          ) : (<FaUserCircle className={styles.avatar} />)}
          <div className={styles.textContainer}>
            <div className={styles.headerText}>
              <span>{props.user.firstName} {props.user.lastName}</span>
              <span>{props.user.FamilyStatus}</span>
            </div>
            <OnlineUser user={props.user} local={props.local}></OnlineUser>
            <div className={styles.description}>{props.user.aboutMe}</div>

          </div>
        </Link>
        {(props.myId !== props.user.id) &&
          <div className={styles.buttonsContainer}>
            {props.user.friendStatus === FriendStatus.Confirmed ? (<button className={styles.button_red_BG} onClick={removeFriend}>{props.local.profile.connect.delete}</button>) : (<></>)}
            {props.user.friendStatus === FriendStatus.Unconfirmed ? (<button className={styles.button_green_BG} onClick={confirmFriend}>{props.local.profile.connect.confirm}</button>) : (<></>)}
            {props.user.friendStatus === FriendStatus.Unconfirmed ? (<button className={styles.button_red_BG} onClick={removeFriend}>{props.local.profile.connect.cancel}</button>) : (<></>)}
            {props.user.friendStatus === FriendStatus.Waiting ? (<button className={styles.button_red_BG} onClick={removeFriend}>{props.local.profile.connect.cancel}</button>) : (<></>)}
            {props.user.friendStatus === FriendStatus.Other ? (<button className={styles.button_green_BG} onClick={addFriend}>{props.local.profile.connect.beFriends}</button>) : (<></>)}
            <button className={styles.button_blue_BG} onClick={() => { props.setSelectedUser(props.user); props.setIsOpen(true); }}>{props.local.profile.connect.write}</button>
          </div>
        }

      </div>
    </>
  )
}