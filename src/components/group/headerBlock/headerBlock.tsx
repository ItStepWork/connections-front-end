"use client"
import { GroupService } from '@/services/group.service';
import { faker } from '@faker-js/faker';
import Link from 'next/link';
import { AiOutlinePlus, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiSolidUserCheck } from 'react-icons/bi';
import { BsFillPatchCheckFill, BsPencilFill } from 'react-icons/bs';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import styles from './styles.module.scss';
import { useState } from 'react';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { EditGroup } from '../editGroup/editGroup';

export function HeaderBlock(props: any) {
  const [component, setComponent] = useState("about");
  const joinGroup = async () => {
    let result = await GroupService.joinGroup(props.group.id);
    alert(result);
    props.getUsers();
    props.getGroup();
  }
  const leaveGroup = async () => {
    let result = await GroupService.leaveGroup(props.group.id);
    alert(result);
    props.getUsers();
    props.getGroup();
  }
  const saveAvatar = async (e: any) => {
    if (e.target.files[0].name.endsWith('.jpg') || e.target.files[0].name.endsWith('.jpeg') || e.target.files[0].name.endsWith('.png')) {
      var formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('id', props.group.id);
      let result = await GroupService.updateAvatar(formData)
      alert(result);
      props.getGroup();
    }
    else alert("Wrong file type");
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
  const openDialog = () => { document.querySelector("dialog")?.showModal(); }
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
                <p> {props.group.audience} группа - {Object.entries(props.users).length} участников</p>
                <div className={styles.description}>
                  <p className="word-break: break-all"> {props.group.description}</p>
                </div>
              </div>
            </div>
            <div className={styles.buttonBlock}>
              {ifInGroup()
                ? ifAdmin()
                  ? <div title='Ты админ' className={styles.greenButton}><MdOutlineAdminPanelSettings className={styles.btnPict + " " + styles.greenPict} />Админ</div>
                  : <button title='Покинуть группу' className={styles.redButton} onClick={leaveGroup}><BiSolidUserCheck className={styles.btnPict + " " + styles.redPict} />Покинуть</button>
                : <button title="Вступить в группу" className={styles.blueButton} onClick={joinGroup} ><AiOutlineUsergroupAdd className={styles.btnPict + " " + styles.bluePict} />Вступить</button>}
              <button title="Пригласить в группу" className={styles.greenButton}><AiOutlinePlus />Пригласить</button>
            </div>
            {ifAdmin() ? <button className={styles.editButton} onClick={() => openDialog()}><span><BsPencilFill className={styles.btnPict + " " + styles.redPict} /></span>Редактировать группу</button> : <></>}

          </div>
          <div className={styles.membersContainer}>
            <div className={styles.members}>
              {props.users.map((user: any, index: any) => {
                if (index < 12) {
                  if (user.avatarUrl !== undefined && user.avatarUrl !== null && user.avatarUrl !== "") return (<div key={index} className="w-4"><img className={styles.memberIco} src={user.avatarUrl}></img></div>)
                  else return (<div key={index} className="w-4"><img className={styles.memberIco} src={faker.image.avatar()}></img></div>)
                }
              })}
              <div className="w-4"><div className={styles.membersDiv}>{Object.entries(props.users).length}</div></div>
            </div>
            <div className={styles.membersNames}>
              <p>
                {props.users.map((user: any, index: any) => {
                  if (index < 6) {
                    if (user.firstName || user.lastName) return (<a key={index}>{user.firstName + " " + user.lastName}, </a>)
                    else return (<a key={index}>no name,</a>)
                  }
                })}</p>
            </div>
          </div>
        </div>
        <div className={styles.cardNav}>
          <div {...component === "posts" ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...component === "posts" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("posts") }}>Посты</button>
          </div>
          <div {...component === "about" ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...component === "about" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("about"); props.setComponent("about") }}>О группе</button>
          </div>
          <div {...component === "members" ? { className: `${styles.counterLink}` } : { className: "flex items-center" }} >
            <button {...component === "members" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("members"); props.setComponent("connections"); }}>Участники</button>
            <div className={styles.counter}>{Object.entries(props.users).length}</div>
          </div>
          <div {...component === "requests" ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...component === "requests" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("requests") }}>Запросы</button>
          </div>
          <div {...component === "media" ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...component === "media" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("media") }}>Медиа</button>
          </div>
          <div {...component === "video" ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...component === "video" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("video") }}>Видео</button>
          </div>
          <div {...component === "activity" ? { className: `${styles.counterLink}` } : { className: "" }} >
            <button {...component === "activity" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("activity") }}>Активность</button>
          </div>
        </div>
      </div>
      <dialog className={styles.dialog} >
        {<EditGroup group={props.group} getGroup={props.getGroup}></EditGroup>}
      </dialog>
    </>
  )
}