'use client'
import { faker } from '@faker-js/faker';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Card } from './card';
import styles from './groupsCard.module.scss';
import { AiOutlineClose,AiOutlinePlus } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';


export function GroupsCardMain(props: any) {
  const options = [
    {
      label: "Public",
      value: '0',
    },
    {
      label: "Private",
      value: '1',
    },
  ];
  const closeDialog = () => { document.querySelector("dialog")?.close(); }
  const openDialog = () => { document.querySelector("dialog")?.showModal(); }
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    let response = await fetch("http://localhost:5288/User/AddGroup", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + session?.user?.accessToken
      },
      body: JSON.stringify(data),
    });

    let result = await response.text();
    if (response.ok) {
      getGroups();
      closeDialog();
    }
    alert(result);
  }
  const [grups, setGroups] = useState([]);
  useEffect(() => {
    getGroups();
  }, []);
  const getGroups = async () => {
    let response = await fetch("http://localhost:5288/User/GetGroups", {
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + props.user.accessToken
      },
    });
    if (response.ok) {
      let result = await response.json();
      setGroups(result);
    }
  }
  return (
    <>
      <div className={styles.container}>
        <dialog >
          <form className={styles.dialogDiv} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.dialogDivHeader}>
              <h2 >Create Group</h2>
              <button type="button" className={styles.closeButton} onClick={closeDialog}>
                <AiOutlineClose size={16}></AiOutlineClose>
              </button>
            </div>
            <div className={styles.dialogDivBody}>

              <div >

                <div className="mb-3">
                  <label>Group name</label>
                  <br></br>
                  <input type="text" className={styles.grInput} placeholder="Add Group name here" {...register('name')} required></input>
                </div>
                <div className="mb-3">
                  <label>Group picture</label>
                  <div className={styles.dialogDivHeader}>
                      <div className="input-div">
                        <input className="input" name="file" type="file"></input>
                          <FaRegUser size={36} className="dark:fill-white" ></FaRegUser>

                      </div>
                    <div className="avatar-remove">
                      <button type="button" id="avatar-reset-img" className={styles.grayButton}>Delete</button>
                    </div>
                  </div>
                </div>
                <div >
                  <label className="form-label d-block">Select audience</label>
                  <div className={styles.checkDiv}>
                    <select
                      className={styles.select}
                      id="audience"
                      {...register('audience')}
                      key={session?.user?.id}
                    >
                      {options.map((option, index) => (
                        <option key={index} value={option.value} typeof="number">{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* <div className="mb-3">
                  <label className="form-label">Invite friend </label>
                  <input type="text" className={styles.grInput} placeholder="Add friend name here"></input>
                </div> */}
                <div className="mb-3">
                  <label className="form-label">Group description </label>
                  <textarea className={styles.grInput} rows={2} placeholder="Description here" {...register('description')} required></textarea>
                </div>
              </div>
            </div>
            <div className={styles.dialogDivFooter}>
              <button type="submit" className={styles.greenButton}>Create now</button>
            </div>
          </form>
        </dialog>
        <div className={styles.header}>
          <div className={styles.groups}>
            <h2>Сообщества</h2>
            <div className={styles.counter}>{grups.length}</div>
          </div>
          <button className={styles.button} onClick={openDialog} >
            <AiOutlinePlus className="dark:fill-white" size={20}></AiOutlinePlus>
          </button>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cards}>
            {grups.map((group, index) => {
              return (<Card key={index} group={group} getGroups={getGroups} ></Card>)
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export function GroupsCard() {
  const { data: session } = useSession();
  let user: any = session?.user;
  if (session === undefined) {
    return (<></>);
  }
  else
    return (
      <GroupsCardMain user={user} />
    )
}