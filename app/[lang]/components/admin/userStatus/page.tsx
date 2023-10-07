"use client"

import { useState } from 'react';
import { Status } from '../../../../../enums/all.enum';
import { AdminService } from '../../../../../services/admin.service';
import styles from './styles.module.scss';

export default function UserStatus(props: any) {
  const [status, setStatus] = useState<Status>(props.user.status);

  const updateUserStatus = async () => {
    await AdminService.updateUserStatus(props.user.id, status);
    props.getUsers();
  }

  return (
    <div className='flex w-full justify-between'>
      <select value={status} onChange={(e: any) => { setStatus(e.target.value) }} className={styles.select}>
        <option value={Status.Active}>{Status.Active}</option>
        <option value={Status.Deleted}>{Status.Deleted}</option>
      </select>
      <button className={props.user.status === status ? styles.button_blue_BG : styles.button_red_BG} onClick={updateUserStatus}>{props.local.admin.save}</button>
    </div>
  )
}