"use client"
import { GroupService } from '@/services/group.service';
import { faker } from '@faker-js/faker';
import Link from 'next/link';
import { AiOutlinePlus, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiSolidUserCheck } from 'react-icons/bi';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import styles from './styles.module.scss';

export function HeaderBlock(props: any) {
  let JoinGroup = async () => {
    let result = await GroupService.joinGroup(props.group.id);
    alert(result);
    props.GetUsers();
    props.getGroup();
  }
  let LeaveGroup = async () => {
    let result = await GroupService.leaveGroup(props.group.id);
    alert(result);
    props.GetUsers();
    props.GetGroup();
  }
  let IfInGroup = () => {
    let find = Object.entries(props.group.users).find(([key, value]) => key === props.session?.user.id);
    if (find === undefined) return false;
    else return true;
  };
  let IfAdmin = () => {
    if (props.group.adminId === props.session?.user.id) return true;
    else return false;
  };
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
              {IfInGroup()
                ? IfAdmin()
                  ? <div title='Ты админ' className={styles.greenButton}><MdOutlineAdminPanelSettings className={styles.btnPict + " " + styles.greenPict} />Админ</div>
                  : <button title='Покинуть группу' className={styles.redButton} onClick={LeaveGroup}><BiSolidUserCheck className={styles.btnPict + " " + styles.redPict} />Покинуть</button>
                : <button title="Вступить в группу" className={styles.blueButton} onClick={JoinGroup} ><AiOutlineUsergroupAdd className={styles.btnPict + " " + styles.bluePict} />Вступить</button>}
              <button title="Пригласить в группу" className={styles.greenButton}><AiOutlinePlus />Пригласить</button>
            </div>
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
          <Link className={styles.link} href='/'>Посты</Link>
          <button className={styles.link} onClick={() => { props.setComponent("about") }}>О группе</button>
          <div className={styles.counterLink}>
            <button className={styles.linkUnderline} onClick={() => { props.setComponent("connections") }}>Участники</button>
            <div className={styles.counter}>{Object.entries(props.users).length}</div>
          </div>
          <button className={styles.linkUnderline} onClick={() => { props.setComponent("connections") }}>Запросы</button>
          <Link className={styles.link} href='/'>Медиа</Link>
          <Link className={styles.link} href='/'>Видео</Link>
          <Link className={styles.link} href='/'>Активность</Link>
        </div>
      </div>
    </>
  )
}