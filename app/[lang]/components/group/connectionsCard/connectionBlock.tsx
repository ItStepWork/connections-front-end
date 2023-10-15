import Link from "next/link";
import { AiOutlineUserDelete, AiOutlineUsergroupAdd, AiOutlineUsergroupDelete } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { BsSendPlus } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { GoPersonAdd } from "react-icons/go";
import { MdOutlineAdminPanelSettings, MdSentimentSatisfiedAlt } from "react-icons/md";
import { toast } from "react-toastify";
import { FriendStatus } from "../../../../../enums/all.enum";
import { FriendService } from "../../../../../services/friend.service";
import { GroupService } from "../../../../../services/group.service";
import OnlineUser from "../../onlineUser/page";
import styles from './connectionBlock.module.scss';

export const ConnectionBlock = (props: any) => {

  const {
    group,
    session,
    user,
    isRequests,
    local,
    setUser,
    setIsOpen,
    lang
  } = props;

  const notifySuccess = (text: string) => toast.success(text, {});
  const ifAdmin = () => {
    if (group.adminId === session?.user?.id) return true;
    else return false;
  };
  const removeUserFromGroup = async () => {
    let result = await GroupService.removeUserFromGroup(group.id, user.id);
    notifySuccess("Участник удален");
  }
  const acceptUserToGroup = async () => {
    let result = await GroupService.acceptUserToGroup(group.id, user.id);
    notifySuccess("Участник принят");
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
  return (
    <>
      <div className={styles.container}>
        <Link href={`/${lang}/profile/` + user.id} className={styles.userContainer}>
          <div className={styles.avatar}>
            {user.avatarUrl
              ? <img className='h-full w-full' src={user.avatarUrl} alt="avatar" loading="lazy" sizes="100vw" style={{ objectFit: "cover" }} />
              : <FaUserCircle className='h-full w-full' />
            }
            <img className='h-full w-full' src={user.avatarUrl} alt="avatar" loading="lazy" sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.headerText}>
              <p className={styles.name}>{user.firstName} {user.lastName}</p>
            </div>
            <OnlineUser user={user} local={local}></OnlineUser>
            <div className={styles.description}>{user.aboutMe}</div>

          </div>
        </Link>
        {isRequests
          ? <div className={styles.buttonsContainer}>
            <button title={local.button.rejectReq} className={styles.button_red_BG} onClick={() => removeUserFromGroup()}><AiOutlineUsergroupDelete size={26} /></button>
            <button title={local.button.confirmReq} className={styles.button_blue_BG} onClick={() => acceptUserToGroup()}><AiOutlineUsergroupAdd size={26} /></button>
          </div>
          : (user.id !== session?.user?.id)
          && <div className={styles.buttonsContainer}>
            {ifAdmin()
              ? <button title={local.button.removeWithGroup} className={styles.button_red_BG} onClick={() => removeUserFromGroup()}><AiOutlineUsergroupDelete size={26} /></button>
              : <></>
            }
            {user.id === group.adminId &&
              <button title={local.groups.adminBtn} className={styles.greenButton}><MdOutlineAdminPanelSettings size={26} className={styles.btnPict + " " + styles.greenPict} /></button>
            }
            <button title={local.button.sendMessage} className={styles.button_blue_BG} onClick={() => { setUser(user); setIsOpen(true); }}><BsSendPlus size={26} /></button>
            {user.friendStatus === FriendStatus.Confirmed ? <button title={local.connections.deleteBtn} className={styles.button_red_BG} onClick={() => removeFriend()}><AiOutlineUserDelete size={26} /></button>
              : user.friendStatus === FriendStatus.Unconfirmed ? <button title={local.connections.confirmBtn} className={styles.yellowButton} onClick={() => confirmFriend()}><MdSentimentSatisfiedAlt size={26} /></button>
                : user.friendStatus === FriendStatus.Waiting ? <button title={local.connections.addRequest} className={styles.yellowButton} onClick={() => removeFriend()}><BiTimeFive size={26} /></button>
                  : user.friendStatus === FriendStatus.Other ? <button title={local.connections.requestBtn} className={styles.button_blue_BG} onClick={() => addFriend()}><GoPersonAdd size={26} /></button>
                    : <></>
            }
          </div>
        }
      </div>
    </>
  )
}