"use client"
import { faker } from '@faker-js/faker';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiSolidUserCheck } from 'react-icons/bi';
import { BsFillPatchCheckFill, BsPencilFill } from 'react-icons/bs';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { MdOutlineAdminPanelSettings, MdOutlineErrorOutline } from 'react-icons/md';
import { TiCancel } from 'react-icons/ti';
import { toast } from 'react-toastify';
import { ComponentName, FileFormats } from '../../../../../enums/all.enum';
import { GroupService } from '../../../../../services/group.service';
import Window from '../../messaging/window/page';
import Complaint from '../../support/complaint/page';
import { EditGroup } from '../editGroup/editGroup';
import { FriendsBlock } from '../friends/friendsBlock';
import styles from './styles.module.scss';
import { CheckService } from '../../../../../services/check.service';

export function HeaderBlock(props: any) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenComplaint, setIsOpenComplaint] = useState<boolean>(false);

  const notifyError = () => toast.warning(props.local.createGroup.toasts.format, {});
  const notifyInfo = () => toast.info(props.local.groups.toasts.join, {});
  const notifySuccess = () => toast.success(props.local.groups.toasts.leave, {});
  const notifySuccess2 = () => toast.success(props.local.setImages.toasts.ok, {});
  const joinGroup = async () => {
    let result = await GroupService.joinGroup(props.group.id);
    notifyInfo();
    props.getUsers();
    props.getGroup();
  }
  const leaveGroup = async () => {
    let result = await GroupService.leaveGroup(props.group.id);
    notifySuccess();
    props.getUsers();
    props.getGroup();
  }
  const saveAvatar = async (e: any) => {
    if (CheckService.imageFormat(e.target.files[0].name)) {
      var formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('id', props.group.id);
      let result = await GroupService.updateAvatar(formData)
      notifySuccess2();;
      props.getGroup();
    }
    else notifyError();
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
                      <input id="avatar-file" type="file" accept={FileFormats.All} className="hidden" onChange={saveAvatar} />
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
                  ? <button title={props.local.groups.tooltip.admin} className={styles.greenButton}><MdOutlineAdminPanelSettings size={20} className={styles.btnPict} />{props.local.groups.adminBtn}</button>
                  : isMemberTrue()
                    ? <button title={props.local.groups.tooltip.leave} className={styles.redButton} onClick={leaveGroup}><BiSolidUserCheck size={20} className={styles.btnPict} />{props.local.groups.leaveBtn}</button>
                    : <button title={props.local.groups.tooltip.cancel} className={styles.yellowButton} onClick={leaveGroup}><TiCancel size={20} className={styles.btnPict} />{props.local.groups.cancelBtn}</button>
                : <button title={props.local.groups.tooltip.join} className={styles.blueButton} onClick={joinGroup} ><AiOutlineUsergroupAdd size={20} className={styles.btnPict} />{props.local.groups.joinBtn}</button>}
              {ifInGroup() && isMemberTrue() && <button title={props.local.groups.tooltip.invite} className={styles.greenButton} onClick={() => setIsOpen(!isOpen)}><AiOutlinePlus className={styles.btnPict} size={20} />{props.local.groups.inviteBtn}</button>}
            </div>
            {ifAdmin() ? <button className={styles.editButton} onClick={() => openDialog()}><BsPencilFill size={20} className={styles.btnPict} />{props.local.groups.editGroupBtn}</button> : <button title={props.local.groups.tooltip.cancel} className={styles.complaintButton} onClick={() => { setIsOpenComplaint(true); }}><MdOutlineErrorOutline size={20} className={styles.btnPict + " " + styles.yellowPict} />Complaint</button>}
          </div>
          <Complaint isOpen={isOpenComplaint} setIsOpen={setIsOpenComplaint} userId={props.group.adminId} groupId={props.group.id} />
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
          <div {...props.component === ComponentName.AboutGroup ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...props.component === ComponentName.AboutGroup ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.AboutGroup) }}>{props.local.groups.aboutGroup.about}</button>
          </div>
          <div {...props.component === ComponentName.Posts ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...props.component === ComponentName.Posts ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.Posts) }}>{props.local.groups.posts}</button>
          </div>
          <div {...props.component === ComponentName.Photos ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...props.component === ComponentName.Photos ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.Photos); }}>{props.local.groups.photo}</button>
          </div>
          <div {...props.component === ComponentName.Members ? { className: `${styles.counterLink}` } : { className: "flex items-center" }} >
            <button {...props.component === ComponentName.Members ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.Members); }}>{props.local.groups.members}</button>
            <div className={styles.counter}>{Object.entries(props.members).length}</div>
          </div>
          {ifAdmin() &&
            <div {...props.component === ComponentName.Requests ? { className: `${styles.counterLink}` } : { className: "flex items-center" }} >
              <button {...props.component === ComponentName.Requests ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { props.setComponent(ComponentName.Requests); }}>{props.local.groups.requests}</button>
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
