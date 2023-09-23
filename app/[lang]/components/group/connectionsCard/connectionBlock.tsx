import Link from "next/link";
import { AiOutlineUserDelete, AiOutlineUsergroupAdd, AiOutlineUsergroupDelete } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { BsSendPlus } from "react-icons/bs";
import { GoPersonAdd } from "react-icons/go";
import { MdOutlineAdminPanelSettings, MdSentimentSatisfiedAlt } from "react-icons/md";
import { toast } from "react-toastify";
import { FriendStatus } from "../../../../../enums/all.enum";
import { FriendService } from "../../../../../services/friend.service";
import { GroupService } from "../../../../../services/group.service";
import OnlineUser from "../../onlineUser/page";
import styles from './connectionBlock.module.scss';

export const ConnectionBlock = (props: any) => {
  const notifyError = (text: string) => toast.warning(text, {});
  const notifyInfo = (text: string) => toast.info(text, {});
  const notifySuccess = (text: string) => toast.success(text, {});
  const ifAdmin = () => {
    if (props.group.adminId === props.session?.user?.id) return true;
    else return false;
  };
  const removeUserFromGroup = async () => {
    let result = await GroupService.removeUserFromGroup(props.group.id, props.user.id);
    notifySuccess("Участник удален");
  }
  const acceptUserToGroup = async () => {
    let result = await GroupService.acceptUserToGroup(props.group.id, props.user.id);
    notifySuccess("Участник принят");
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
  return (
    <>
      <div className={styles.container}>
        <Link href={"/profile/" + props.user.id} className={styles.userContainer}>
          <div className={styles.avatar}>
            <img src={props.user.avatarUrl} alt="avatar" loading="lazy" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.headerText}>
              <p className={styles.name}>{props.user.firstName} {props.user.lastName}</p>
            </div>
            <OnlineUser user={props.user} local={props.local}></OnlineUser>
            <div className={styles.description}>{props.user.aboutMe}</div>

          </div>
        </Link>
        {props.isRequests
          ? <div className={styles.buttonsContainer}>
            <button title={props.local.button.rejectReq} className={styles.button_red_BG} onClick={() => removeUserFromGroup()}><AiOutlineUsergroupDelete size={26} /></button>
            <button title={props.local.button.confirmReq} className={styles.button_blue_BG} onClick={() => acceptUserToGroup()}><AiOutlineUsergroupAdd size={26} /></button>
          </div>
          : (props.user.id !== props.session?.user?.id)
          && <div className={styles.buttonsContainer}>
            {ifAdmin()
              ? <button title={props.local.button.removeWithGroup} className={styles.button_red_BG} onClick={() => removeUserFromGroup()}><AiOutlineUsergroupDelete size={26} /></button>
              : <></>
            }
            {props.user.id === props.group.adminId &&
              <button title={props.local.groups.adminBtn} className={styles.greenButton}><MdOutlineAdminPanelSettings size={26} className={styles.btnPict + " " + styles.greenPict} /></button>
            }
            <button title={props.local.button.sendMessage} className={styles.button_blue_BG} onClick={() => { props.setUser(props.user); props.setIsOpen(true); }}><BsSendPlus size={26} /></button>
            {props.user.friendStatus === FriendStatus.Confirmed ? <button title={props.local.connections.deleteBtn} className={styles.button_red_BG} onClick={() => removeFriend()}><AiOutlineUserDelete size={26} /></button>
              : props.user.friendStatus === FriendStatus.Unconfirmed ? <button title={props.local.connections.confirmBtn} className={styles.yellowButton} onClick={() => confirmFriend()}><MdSentimentSatisfiedAlt size={26} /></button>
                : props.user.friendStatus === FriendStatus.Waiting ? <button title={props.local.connections.addRequest} className={styles.yellowButton} onClick={() => removeFriend()}><BiTimeFive size={26} /></button>
                  : props.user.friendStatus === FriendStatus.Other ? <button title={props.local.connections.requestBtn} className={styles.button_blue_BG} onClick={() => addFriend()}><GoPersonAdd size={26} /></button>
                    : <></>
            }
          </div>
        }
      </div>
    </>
  )
}