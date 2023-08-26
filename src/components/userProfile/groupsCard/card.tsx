import { GroupService } from '@/services/group.service';
import { faker } from '@faker-js/faker';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineUsergroupAdd, AiOutlineUsergroupDelete } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import styles from './card.module.scss';
import { TiCancel, TiCancelOutline } from 'react-icons/ti';

export const Card = (props: any) => {
  const { data: session, update } = useSession();
  const [users, setUsers] = useState<any[]>([])
  useEffect(() => {
    getUsers();
  }, []);
  let getUsers = async () => {
    let result = await GroupService.getMembersGroup(props.group.id);
    setUsers(result);
  }
  let joinGroup = async () => {
    let result = await GroupService.joinGroup(props.group.id);
    alert(result);
    getUsers();
    props.getGroups();
  }
  let leaveGroup = async () => {
    let result = await GroupService.leaveGroup(props.group.id);
    alert(result);
    getUsers();
    props.getGroups();
  }
  let ifInGroup = () => {
    let find = Object.entries(props.group.users).find(([key, value]) => key === session?.user.id);
    if (find === undefined) return false;
    else return true;
  };
  let isMemberTrue = () => {
    let find = Object.entries(props.group.users).find(([key, value]) => key === session?.user.id && value === true);
    if (find === undefined) return false;
    else return true;
  };
  let ifAdmin = () => {
    if (props.group.adminId === session?.user.id) return true;
    else return false;
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.audienceDiv}>
          {(props.group.audience === "Private")
            ? <RiGitRepositoryPrivateLine className="absolute" title="Private"></RiGitRepositoryPrivateLine>
            : <></>}
        </div>
        <Link className='pt-1' href={"/group/" + props.group.id}>
          <div className={styles.avatar}>
            <img className='rounded-full w-[84px] h-[84px]'
              src={props.group.pictureUrl}
              alt="Picture of the author"
            />
          </div>
          <div className={styles.fio}>
            <h4 title={props.group.name}>{props.group.name}</h4>
            <p title={props.group.description}>{props.group.description}</p>
            <div className={styles.membersContainer}>
              <div className={styles.members}>
                {users.map((user: any, index) => {
                  if (index < 6) {
                    if (user.avatarUrl !== undefined && user.avatarUrl !== null && user.avatarUrl !== "") return (<div key={index} className="w-4"><img className={styles.memberIco} src={user.avatarUrl}></img></div>)
                    else return (<div key={index} className="w-4"><img className={styles.memberIco} src={faker.image.avatar()}></img></div>)
                  }
                })}
                <div className="w-4"><div className={styles.membersDiv}>+{users.length} </div></div>
              </div>
            </div>
            <p className='mt-8'>{users.length} участников</p>
          </div>
        </Link>
        <div className={styles.buttons}>
          {ifInGroup()
            ? ifAdmin()
              ? <div title='Ты Администратор' className={styles.greenButton}><MdOutlineAdminPanelSettings className={styles.btnPict + " " + styles.greenPict}></MdOutlineAdminPanelSettings></div>
              : isMemberTrue()
                ? <button title='Покинуть группу' className={styles.redButton} onClick={leaveGroup}><AiOutlineUsergroupDelete className={styles.btnPict + " " + styles.redPict}></AiOutlineUsergroupDelete></button>
                : <button title='Отменить запрос' className={styles.yellowButton} onClick={leaveGroup}><TiCancel className={styles.btnPict + " " + styles.yellowPict}></TiCancel></button>
            : <button title="Присоединится у группе" className={styles.blueButton} onClick={joinGroup} ><AiOutlineUsergroupAdd className={styles.btnPict + " " + styles.bluePict} /></button>}
        </div>
      </div>
    </>
  )
}