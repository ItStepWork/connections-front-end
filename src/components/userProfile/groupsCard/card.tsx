import { faker } from '@faker-js/faker';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import styles from './card.module.scss';
import { useSession } from "next-auth/react";
import { useState } from 'react';


export const Card = (props: any) => {
  const { data: session, update } = useSession();
  const [render, setRender] = useState(false);
  let JoinGroup = async () => {
    let response = await fetch("http://localhost:5288/User/JoinGroup?id=" + props.group.id, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + session?.user?.accessToken
      }
    });
    let result = await response.text();
    alert(result);
    if (response.ok) props.getGroups();
  }
  let LeaveGroup = async ()=> {
    let response = await fetch("http://localhost:5288/User/LeaveGroup?id=" + props.group.id, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + session?.user?.accessToken
      }
    });
    let result = await response.text();
    alert(result);
    if (response.ok) props.getGroups();
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
        <Link href={"/groupPage?id=" + props.group.id}>
          <div className={styles.avatar}>
            <Image className='rounded-full'
              src={faker.image.avatar()}
              width={84}
              height={84}
              style={{ objectFit: "contain" }}
              alt="Picture of the author"
            />
          </div>

          <div className={styles.fio}>

            <h4 className={styles.link}>{props.group.name}</h4>
            <p>{props.group.description}</p>
            <div className={styles.membesContainer}>
              <div className={styles.members}>
                {Object.entries(props.group.users).map((user, index) => {
                  if (index < 6)
                    return (<div key={index} className="w-4"><img className={styles.memberIco} src={faker.image.avatar()}></img></div>)
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