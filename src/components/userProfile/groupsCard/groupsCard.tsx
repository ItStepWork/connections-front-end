'use client'
import { faker } from '@faker-js/faker';
import Link from 'next/link';
import { Card } from './card';
import styles from './groupsCard.module.scss';
import { Button } from 'flowbite-react';
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

export function GroupsCard() {
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
    console.log(data);
    //data.audience = '1';
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
    if (result.toString() == 'Group added')
      closeDialog;
    alert(result);
    // closeDialog();
  }
  return (
    <>

      <div className={styles.container}>
        <dialog >
          {/* <div className={styles.dialogDivLitle}>
            <h2>Create Group</h2>
            <input className={styles.grInput} placeholder='Enter Name'></input>
            <div className={styles.dialogButtonDiv}>
              <button className={styles.blueButton}>Create</button>
              <button className={styles.redButton} onClick={closeDialog}>Cancel</button>
            </div>
          </div> */}
          <form className={styles.dialogDiv} onSubmit={handleSubmit(onSubmit)}>

            <div className={styles.dialogDivHeader}>
              <h2 >Create Group</h2>
              {/* <button type="button"  onClick={closeDialog}>X</button> */}
              <button type="button" className={styles.closeButton} onClick={closeDialog}>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
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
                    <div className="avatar-uploader me-3">

                      {/* <div className="avatar-edit">
                        <input className={styles.grInput} type="file" id="avatarUpload" accept=".png, .jpg, .jpeg"></input>
                        <label htmlFor="avatarUpload"></label>
                      </div>

                      <div className="avatar avatar-xl position-relative">
                        <img id="avatar-preview" className="avatar-img rounded-circle border border-white border-3 shadow" src="assets/images/avatar/placeholder.jpg" alt=""></img>
                      </div> */}
                      <div className="input-div">
                        <input className="input" name="file" type="file"></input>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
                      </div>
                    </div>

                    <div className="avatar-remove">
                      <button type="button" id="avatar-reset-img" className={styles.grayButton}>Delete</button>
                    </div>
                  </div>

                </div>

                <div >
                  <label className="form-label d-block">Select audience</label>
                  <div className={styles.checkDiv}>
                    {/* <div className="form-check form-check-inline">
                      <input {...register("audience",{required:true})} className={styles.radioButton} type="radio" 
                      name="PublicRadioOptions" id="publicRadio1" value='0' checked/>
                      <label className="form-check-label" htmlFor="publicRadio1">Public</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input {...register("audience",{required:true})} className={styles.radioButton} type="radio"
                       name="PublicRadioOptions" id="privateRadio2" value='1'/>
                      <label className="form-check-label" htmlFor="privateRadio2">Private</label>
                    </div> */}
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