import { faker } from '@faker-js/faker';
import Link from 'next/link';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import { AiOutlineUsergroupDelete, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import styles from './card.module.scss';
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { GroupService } from '@/services/group.service';

export const Card = (props: any) => {
  const { data: session, update } = useSession();
  const [users, setUsers] = useState<any[]>([])
  useEffect(() => {
    GetUsers();
  }, []);
  let GetUsers = async () => {
    let result = await GroupService.getUsersGroup(props.group.id);
    setUsers(result);
  }
  let JoinGroup = async () => {
    let result = await GroupService.joinGroup(props.group.id);
    alert(result.data);
    props.getGroups();
  }
  let LeaveGroup = async () => {
    let result = await GroupService.leaveGroup(props.group.id);
    alert(result);
    props.getGroups();
  }
  let IfInGroup = () => {
    let find = Object.entries(props.group.users).find(([key, value]) => key === session?.user.id);
    if (find === undefined) return false;
    else return true;
  };
  let IfAdmin = () => {
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
        <Link className='pt-5' href={"/groupPage/" + props.group.id}>
          <div className={styles.avatar}>
            <img className='rounded-full w-[84px] h-[84px]'
              src={props.group.pictureUrl}
              alt="Picture of the author"
            />
          </div>
          <div className={styles.fio}>
            <h4>{props.group.name}</h4>
            <p>{props.group.description}</p>
            <div className={styles.membesContainer}>
              <div className={styles.members}>
                {users.map((user: any, index) => {
                  if (index < 6) {
                    if (user.avatarUrl !== undefined && user.avatarUrl !== null && user.avatarUrl !== "") return (<div key={index} className="w-4"><img className={styles.memberIco} src={user.avatarUrl}></img></div>)
                    else return (<div key={index} className="w-4"><img className={styles.memberIco} src={faker.image.avatar()}></img></div>)
                  }
                })}
                <div className="w-4"><div className={styles.membersDiv}>+{Object.entries(props.group.users).length} </div></div>
              </div>
            </div>
            <p className='mt-8'>{Object.entries(props.group.users).length} учасников</p>
          </div>
        </Link>
        <div className={styles.buttons}>
          {IfInGroup()
            ? IfAdmin()
              ? <div title='You Admin' className={styles.greenButton}><MdOutlineAdminPanelSettings className={styles.btnPict + " " + styles.greenPict}></MdOutlineAdminPanelSettings></div>
              : <button title='Leave Group' className={styles.redButton} onClick={LeaveGroup}><AiOutlineUsergroupDelete className={styles.btnPict + " " + styles.redPict}></AiOutlineUsergroupDelete></button>
            : <button title="Join Group" className={styles.blueButton} onClick={JoinGroup} ><AiOutlineUsergroupAdd className={styles.btnPict + " " + styles.bluePict} /></button>}
        </div>
      </div>
    </>
  )
}