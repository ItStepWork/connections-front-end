'use client'
import { faker } from '@faker-js/faker';
import Link from 'next/link';
import { Card } from './card';
import styles from './groupsCard.module.scss';
import { Button } from 'flowbite-react';

function openDialog(){
  console.log("ggggg");
   document.querySelector("dialog")?.showModal();
}

export function GroupsCard () {

const closeDialog = ()=>{console.log("ggggg");
document.querySelector("dialog")?.close();}

  return (
    <>
   
      <div id='newGroup_dialog' className={styles.container}>
      <dialog >
      <input placeholder='Enter GroupName'></input>
      <div className={styles.dialogButton_div}>
        <button className={styles.button}>OK</button>
        <button className={styles.button} onClick={closeDialog}>Cancel</button>
      </div>
    </dialog>
        <div className={styles.header}>
          
          <div className={styles.groups}>
            <h2>Сообщества</h2>
            <div className={styles.counter}>{faker.number.int(322)}</div>
          </div>
          {/* <Link href='/' className={styles.button}>Мои</Link> */}
          <button className={styles.button} onClick={openDialog} >+</button>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cards}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  )
}