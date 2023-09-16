"use client"
import { faker } from '@faker-js/faker';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiSolidUserCheck } from 'react-icons/bi';
import { BsFillPatchCheckFill, BsPencilFill } from 'react-icons/bs';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { TiCancel } from 'react-icons/ti';
import { toast } from 'react-toastify';
import { GroupService } from '../../../../../services/group.service';
import Window from '../../messaging/window/page';
import { EditGroup } from '../editGroup/editGroup';
import { FriendsBlock } from '../friends/friendsBlock';
import styles from './styles.module.scss';

export function HeaderBlock(props: any) {
  const [isOpen, setIsOpen] = useState(false)

  const notifyError = (text: string) => toast.warning(text, {});
  const notifyInfo = (text: string) => toast.info(text, {});
  const notifySuccess = (text: string) => toast.success(text, {});
  const joinGroup = async () => {
    let result = await GroupService.joinGroup(props.group.id);
    notifySuccess("Заявку подано");
    props.getUsers();
    props.getGroup();
  }
  const leaveGroup = async () => {
    let result = await GroupService.leaveGroup(props.group.id);
    notifySuccess("Вы вышли из группы");
    props.getUsers();
    props.getGroup();
  }
  const saveAvatar = async (e: any) => {
    if (e.target.files[0].name.endsWith('.jpg') || e.target.files[0].name.endsWith('.jpeg') || e.target.files[0].name.endsWith('.png')) {
      var formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('id', props.group.id);
      let result = await GroupService.updateAvatar(formData)
      notifySuccess("Аватар обновлен");;
      props.getGroup();
    }
    else notifyError("Wrong file type");
  }
  let ifInGroup = () => {
    let find = Object.entries(props.group.users).find(([key, value]) => key === props.session?.user.id);
    if (find === undefined) return false;
    else return true;
  };
  let ifAdmin = () => {
    if (props.group.adminId === props.session?.user.id) return true;
    else return false;
  };
  let isMemberTrue = () => {
    let find = Object.entries(props.group.users).find(([key, value]) => key === props.session?.user.id && value === true);
    if (find === undefined) return false;
    else return true;
  };
  const openDialog = () => {
    var dialog: any = document.getElementById("editGroupDialog")
    dialog?.showModal();
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardBody}>
          <div className={styles.topInfo}>
            <div className={styles.avatarName}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  <img className='rounded-full w-full h-full'
                    src={props.group.pictureUrl}
                    alt="Picture of the author"
                  />
                </div>
                {ifAdmin()
                  ? <div className={styles.editAvatar}>
                    <label htmlFor="avatar-file" className={styles.avatarLabel}>
                      <div className={styles.avatarIcon}>
                        <HiMiniPencilSquare className="fill-white" />
                      </div>
                      <input id="avatar-file" type="file" accept=".jpg, .jpeg, .png" className="hidden" onChange={saveAvatar} />
                    </label>
                  </div>
                  : <></>
                }
              </div>
              <div className={styles.nameBlock}>
                <div className={styles.name}>
                  <h2>{props.group.name}</h2>
                  <span><BsFillPatchCheckFill size={18} /></span>
                </div>
                <p> {props.group.audience} {props.local.groups.privacy} : {props.local.groups.subtitle} - {Object.entries(props.members).length}</p>
                <div className={styles.description}>
                  <p className="word-break: break-all"> {props.group.description}</p>
                </div>
              </div>
            </div>
            <div className={styles.buttonBlock}>
              {ifInGroup()
                ? ifAdmin()
                  ? <div title={props.local.groups.tooltip.admin} className={styles.greenButton}><MdOutlineAdminPanelSettings className={styles.btnPict + " " + styles.greenPict} />{props.local.groups.adminBtn}</div>
                  : isMemberTrue()
                    ? <button title={props.local.groups.tooltip.leave} className={styles.redButton} onClick={leaveGroup}><BiSolidUserCheck className={styles.btnPict + " " + styles.redPict} />{props.local.groups.leaveBtn}</button>
                    : <button title={props.local.groups.tooltip.cancel} className={styles.yellowButton} onClick={leaveGroup}><TiCancel size={20} className={styles.btnPict + " " + styles.yellowPict} />{props.local.groups.cancelBtn}</button>
                : <button title={props.local.groups.tooltip.join} className={styles.blueButton} onClick={joinGroup} ><AiOutlineUsergroupAdd className={styles.btnPict + " " + styles.bluePict} />{props.local.groups.joinBtn}</button>}
              {ifInGroup() && isMemberTrue() && <button title={props.local.groups.tooltip.invite} className={styles.greenButton} onClick={() => setIsOpen(!isOpen)}><AiOutlinePlus />{props.local.groups.inviteBtn}</button>}
            </div>
            {ifAdmin() ? <button className={styles.editButton} onClick={() => openDialog()}><span><BsPencilFill className={styles.btnPict + " " + styles.redPict} /></span>{props.local.groups.editGroupBtn}</button> : <></>}
          </div>
          <div className={styles.membersContainer}>
            <div className={styles.members}>
              {props.members.map((user: any, index: any) => {
                if (index < 12) {
                  if (user.avatarUrl !== undefined && user.avatarUrl !== null && user.avatarUrl !== "") return (<div key={index} className="w-4"><img className={styles.memberIco} src={user.avatarUrl}></img></div>)
                  else return (<div key={index} className="w-4"><img className={styles.memberIco} src={faker.image.avatar()}></img></div>)
                }
              })}
              <div className="w-4"><div className={styles.membersDiv}>{Object.entries(props.members).length}</div></div>
            </div>
            <div className={styles.membersNames}>
              <p>
                {props.members.map((user: any, index: any) => {
                  if (index < 6) {
                    if (user.firstName || user.lastName) return (<a key={index}>{user.firstName + " " + user.lastName}, </a>)
                    else return (<a key={index}>no name,</a>)
                  }
                })}</p>
            </div>
          </div>
        </div>
        <div className={styles.cardNav}>
          <div {...props.component === "about" ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...props.component === "about" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent("about") }}>{props.local.groups.aboutGroup.about}</button>
          </div>
          <div {...props.component === "posts" ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...props.component === "posts" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent("posts") }}>{props.local.groups.posts}</button>
          </div>
          <div {...props.component === "photo" ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...props.component === "photo" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent("photo"); }}>{props.local.groups.photo}</button>
          </div>
          <div {...props.component === "members" ? { className: `${styles.counterLink}` } : { className: "flex items-center" }} >
            <button {...props.component === "members" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent("members"); }}>{props.local.groups.members}</button>
            <div className={styles.counter}>{Object.entries(props.members).length}</div>
          </div>
          {ifAdmin() &&
            <div {...props.component === "requests" ? { className: `${styles.counterLink}` } : { className: "flex items-center" }} >
              <button {...props.component === "requests" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent("requests"); }}>{props.local.groups.requests}</button>
              <div className={styles.counter}>{Object.entries(props.usersRequests).length}</div>
            </div>
          }
        </div>
      </div>
      <dialog className={styles.dialog} id='editGroupDialog'>
        {<EditGroup groupSocket={props.groupSocket} group={props.group} getGroup={props.getGroup} local={props.local}></EditGroup>}
      </dialog>
      {props.group &&
        <Window name={props.group.name} isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className='flex h-5/6 justify-center items-end'>
            {/* <FooterBlock friendId={user.id} /> */}
            <FriendsBlock group={props.group} friendsForInvitation={props.friendsForInvitation} getFriendsForInvitation={props.getFriendsForInvitation} local={props.local}></FriendsBlock>
          </div>
        </Window>

      }
    </>
  )
}
