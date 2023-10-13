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
import { CheckService } from '../../../../../services/check.service';
import { GroupService } from '../../../../../services/group.service';
import Window from '../../messaging/window/page';
import Complaint from '../../support/complaint/page';
import { EditGroup } from '../editGroup/editGroup';
import { FriendsBlock } from '../friends/friendsBlock';
import styles from './styles.module.scss';

export function HeaderBlock(props: any) {

  const {
    groupSocket,
    session,
    group,
    usersRequests,
    members,
    getGroup,
    getUsers,
    component,
    setComponent,
    local,
    friendsForInvitation,
    getFriendsForInvitation,
    lang
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenComplaint, setIsOpenComplaint] = useState<boolean>(false);

  const notifyError = () => toast.warning(local.createGroup.toasts.format, {});
  const notifyInfo = () => toast.info(local.groups.toasts.join, {});
  const notifySuccess = () => toast.success(local.groups.toasts.leave, {});
  const notifySuccess2 = () => toast.success(local.setImages.toasts.ok, {});
  const joinGroup = async () => {
    let result = await GroupService.joinGroup(group.id);
    notifyInfo();
    getUsers();
    getGroup();
  }
  const leaveGroup = async () => {
    let result = await GroupService.leaveGroup(group.id);
    notifySuccess();
    getUsers();
    getGroup();
  }
  const saveAvatar = async (e: any) => {
    if (CheckService.imageFormat(e.target.files[0].name)) {
      var formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('id', group.id);
      let result = await GroupService.updateAvatar(formData)
      notifySuccess2();;
      getGroup();
    }
    else notifyError();
  }
  let ifInGroup = () => {
    let find = Object.entries(group.users).find(([key, value]) => key === session?.user.id);
    if (find === undefined) return false;
    else return true;
  };
  let ifAdmin = () => {
    if (group.adminId === session?.user.id) return true;
    else return false;
  };
  let isMemberTrue = () => {
    let find = Object.entries(group.users).find(([key, value]) => key === session?.user.id && value === true);
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
                    src={group.pictureUrl}
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
                  <h2>{group.name}</h2>
                  <span><BsFillPatchCheckFill size={18} /></span>
                </div>
                <p> {group.audience} {local.groups.privacy} : {local.groups.subtitle} - {Object.entries(members).length}</p>
                <div className={styles.description}>
                  <p className="word-break: break-all"> {group.description}</p>
                </div>
              </div>
            </div>
            <div className={styles.buttonBlock}>
              {ifInGroup()
                ? ifAdmin()
                  ? <button title={local.groups.tooltip.admin} className={styles.greenButton}><MdOutlineAdminPanelSettings size={20} className={styles.btnPict} />{local.groups.adminBtn}</button>
                  : isMemberTrue()
                    ? <button title={local.groups.tooltip.leave} className={styles.redButton} onClick={leaveGroup}><BiSolidUserCheck size={20} className={styles.btnPict} />{local.groups.leaveBtn}</button>
                    : <button title={local.groups.tooltip.cancel} className={styles.yellowButton} onClick={leaveGroup}><TiCancel size={20} className={styles.btnPict} />{local.groups.cancelBtn}</button>
                : <button title={local.groups.tooltip.join} className={styles.blueButton} onClick={joinGroup} ><AiOutlineUsergroupAdd size={20} className={styles.btnPict} />{local.groups.joinBtn}</button>}
              {ifInGroup() && isMemberTrue() && <button title={local.groups.tooltip.invite} className={styles.greenButton} onClick={() => setIsOpen(!isOpen)}><AiOutlinePlus className={styles.btnPict} size={20} />{local.groups.inviteBtn}</button>}
            </div>
            {ifAdmin() 
            ? <button 
                className={styles.editButton} 
                onClick={() => openDialog()}>
                  <BsPencilFill size={20} className={styles.btnPict} />
                  {local.groups.editGroupBtn}
              </button> 
            : <button 
                title={local.groups.tooltip.cancel} 
                className={styles.complaintButton} 
                onClick={() => { setIsOpenComplaint(true); }}>
                  <MdOutlineErrorOutline size={20} className={styles.btnPict + " " + styles.yellowPict} />
                  {local.posts.report}
              </button>}
          </div>
          <Complaint 
            isOpen={isOpenComplaint} 
            setIsOpen={setIsOpenComplaint} 
            userId={group.adminId} 
            groupId={group.id} 
            local={local}
          />
          <div className={styles.membersContainer}>
            <div className={styles.members}>
              {members.map((user: any, index: any) => {
                if (index < 12) {
                  if (user.avatarUrl !== undefined && user.avatarUrl !== null && user.avatarUrl !== "") return (<div key={index} className="w-4"><img className={styles.memberIco} src={user.avatarUrl}></img></div>)
                  else return (<div key={index} className="w-4"><img className={styles.memberIco} src={faker.image.avatar()}></img></div>)
                }
              })}
              <div className="w-4"><div className={styles.membersDiv}>{Object.entries(members).length}</div></div>
            </div>
            <div className={styles.membersNames}>
              <p>
                {members.map((user: any, index: any) => {
                  if (index < 6) {
                    if (user.firstName || user.lastName) return (<a key={index}>{user.firstName + " " + user.lastName}, </a>)
                    else return (<a key={index}>no name,</a>)
                  }
                })}</p>
            </div>
          </div>
        </div>
        <div className={styles.cardNav}>
          <div {...component === ComponentName.AboutGroup ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...component === ComponentName.AboutGroup ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.AboutGroup) }}>{local.groups.aboutGroup.about}</button>
          </div>
          <div {...component === ComponentName.Posts ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...component === ComponentName.Posts ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Posts) }}>{local.groups.posts}</button>
          </div>
          <div {...component === ComponentName.Photos ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...component === ComponentName.Photos ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Photos); }}>{local.groups.photo}</button>
          </div>
          <div {...component === ComponentName.Members ? { className: `${styles.counterLink}` } : { className: "flex items-center" }} >
            <button {...component === ComponentName.Members ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Members); }}>{local.groups.members}</button>
            <div className={styles.counter}>{Object.entries(members).length}</div>
          </div>
          {ifAdmin() &&
            <div {...component === ComponentName.Requests ? { className: `${styles.counterLink}` } : { className: "flex items-center" }} >
              <button {...component === ComponentName.Requests ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent(ComponentName.Requests); }}>{local.groups.requests}</button>
              <div className={styles.counter}>{Object.entries(usersRequests).length}</div>
            </div>
          }
        </div>
      </div>
      <dialog className={styles.dialog} id='editGroupDialog'>
        {<EditGroup 
          groupSocket={groupSocket} 
          group={group} 
          getGroup={getGroup} 
          local={local} 
          lang={lang}>
        </EditGroup>}
      </dialog>
      {group &&
        <Window name={group.name} isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className='flex h-5/6 justify-center items-end'>
            {/* <FooterBlock friendId={user.id} /> */}
            <FriendsBlock group={group} friendsForInvitation={friendsForInvitation} getFriendsForInvitation={getFriendsForInvitation} local={local}></FriendsBlock>
          </div>
        </Window>

      }
    </>
  )
}
