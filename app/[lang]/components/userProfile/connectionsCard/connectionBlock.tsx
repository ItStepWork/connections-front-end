import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import { FriendStatus } from '../../../../../enums/all.enum';
import { FriendService } from '../../../../../services/friend.service';
import styles from './connectionBlock.module.scss';

export const ConnectionBlock = (props: any) => {

  const addFriend = async () => {
    await FriendService.addFriend(props.user.id);
    props.getUsers();
  }

  const confirmFriend = async () => {
    await FriendService.confirmFriend(props.user.id);
    props.getUsers();
  }

  const removeFriend = async () => {
    await FriendService.removeFriend(props.user.id);
    props.getUsers();
  }

  return (
    <>
      <div className={styles.container}>
        <Link className={styles.userContainer} href={`/profile/${props.user.id}`} target='_blank'>
          {props.user.avatarUrl ? (
            <img src={props.user.avatarUrl} className={styles.avatar} alt="avatar"></img>
          ) : (<FaUserCircle className={styles.avatar} />)}
          <div className={styles.textContainer}>
            <div className={styles.headerText}>
              <span>{props.user.firstName} {props.user.lastName}</span>
              <span>{props.user.FamilyStatus}</span>
            </div>
            <div className={styles.description}>{props.user.aboutMe}</div>
          </div>
        </Link>
        {(props.myId !== props.user.id) &&
          <div className={styles.buttonsContainer}>
            {props.user.friendStatus === FriendStatus.Confirmed ? (<button className={styles.button_red_BG} onClick={removeFriend}>Удалить</button>) : (<></>)}
            {props.user.friendStatus === FriendStatus.Unconfirmed ? (<button className={styles.button_green_BG} onClick={confirmFriend}>Подтвердить</button>) : (<></>)}
            {props.user.friendStatus === FriendStatus.Waiting ? (<button className={styles.button_green_BG} disabled>Ожидание</button>) : (<></>)}
            {props.user.friendStatus === FriendStatus.Other ? (<button className={styles.button_green_BG} onClick={addFriend}>Дружить</button>) : (<></>)}
            <button className={styles.button_blue_BG} onClick={() => { props.setSelectedUser(props.user); props.setIsOpen(true); }}>Написать</button>
          </div>
        }

      </div>
    </>
  )
}