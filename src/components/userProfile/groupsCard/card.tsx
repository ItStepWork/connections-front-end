import { faker } from '@faker-js/faker';
import Image from 'next/image';
import Link from 'next/link';
import {AiOutlineUsergroupAdd } from 'react-icons/ai';
import styles from './card.module.scss';
import { useSession } from "next-auth/react";

export const Card = (props:any) => {
  const { data: session, update } = useSession();
  let JoinGroup = async()=>{
    let response = await fetch("http://localhost:5288/User/JoinGroup?id="+props.group.id, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + session?.user?.accessToken
      }
    });
    let result = await response.text();
    alert(result);
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <Image
            src={faker.image.avatar()}
            width={76}
            height={76}
            style={{ objectFit: "contain" }}
            alt="Picture of the author"
          />
        </div>
        <div className={styles.fio}>
          <h4>{props.group.name}</h4>
          <p>{props.group.description}</p>
          <p>{Object.entries(props.group.users).length} учасников</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.blueButton} onClick={JoinGroup} ><AiOutlineUsergroupAdd size={16} /></button>
        </div>
      </div>
    </>
  )
}