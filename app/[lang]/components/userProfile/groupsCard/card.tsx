import { faker } from '@faker-js/faker';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineUsergroupAdd, AiOutlineUsergroupDelete } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import { TiCancel } from 'react-icons/ti';
import { toast } from 'react-toastify';
import { GroupService } from '../../../../../services/group.service';
import styles from './card.module.scss';

export const Card = (props: any) => {

  const {
    group,
    local,
    session
  } = props

  const [users, setUsers] = useState<any[]>([])
  useEffect(() => {
    getUsers();

  }, []);
 
  const notifySuccess = (text: string) => toast.info(text, {});
  let getUsers = async () => {
    let result = await GroupService.getMembersGroup(group.id);
    setUsers(result);
  }
  let joinGroup = async () => {
    let result = await GroupService.joinGroup(group.id);
    notifySuccess(local.groups.toasts.join);
  }
  let leaveGroup = async () => {
    let result = await GroupService.leaveGroup(group.id);
    notifySuccess(local.groups.toasts.leave);
  }
  let ifInGroup = () => {
    let find = Object.entries(group.users).find(([key, value]) => key === session?.user.id);
    if (find === undefined) return false;
    else return true;
  };
  let isMemberTrue = () => {
    let find = Object.entries(group.users).find(([key, value]) => key === session?.user.id && value === true);
    if (find === undefined) return false;
    else return true;
  };
  let ifAdmin = () => {
    if (group.adminId === session?.user.id) return true;
    else return false;
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.audienceDiv}>
          {(group.audience === "Private")
            ? <RiGitRepositoryPrivateLine className="absolute" title={local.editGroup.privacy.private}></RiGitRepositoryPrivateLine>
            : <></>}
        </div>
        <Link className='pt-1' href={"/group/" + group.id}>
          <div className={styles.avatar}>
            <img className='rounded-full w-[84px] h-[84px]'
              src={group.pictureUrl}
              alt="Picture of the author"
            />
          </div>
          <div className={styles.fio}>
            <h4 title={group.name}>{group.name}</h4>
            <p title={group.description}>{group.description}</p>
            <div className={styles.membersContainer}>
              <div className={styles.members}>
                {users && users.map((user: any, index) => {
                  if (index < 5) {
                    if (user.avatarUrl !== undefined && user.avatarUrl !== null && user.avatarUrl !== "") return (<div key={index} className="w-4"><img className={styles.memberIco} src={user.avatarUrl}></img></div>)
                    else return (
                    <div key={index} className="w-4">
                      <img className={styles.memberIco} src={faker.image.avatar()}></img>
                    </div>)
                  }
                })}
                <div className="w-4"><div className={styles.membersDiv}>+{users.length} </div></div>
              </div>
            </div>
          </div>
        </Link>
        <div className={styles.buttons}>
          {ifInGroup()
            ? ifAdmin()
              ? <div title={local.groups.tooltip.admin} className={styles.greenButton}><MdOutlineAdminPanelSettings className={styles.btnPict + " " + styles.greenPict}></MdOutlineAdminPanelSettings></div>
              : isMemberTrue()
                ? <button 
                    title={local.groups.tooltip.leave} 
                    className={styles.redButton} 
                    onClick={leaveGroup}>
                      <AiOutlineUsergroupDelete className={styles.btnPict + " " + styles.redPict}></AiOutlineUsergroupDelete>
                  </button>
                : <button 
                    title={local.groups.tooltip.cancel} 
                    className={styles.yellowButton} 
                    onClick={leaveGroup}>
                      <TiCancel className={styles.btnPict + " " + styles.yellowPict}></TiCancel>
                  </button>
            : <button 
                title={local.groups.tooltip.join} 
                className={styles.blueButton} 
                onClick={joinGroup}>
                  <AiOutlineUsergroupAdd className={styles.btnPict + " " + styles.bluePict} />
              </button>}
        </div>
      </div>
    </>
  )
}