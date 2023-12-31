"use client"

import { useState } from 'react';
import { Status } from '../../../../../enums/all.enum';
import { AdminService } from '../../../../../services/admin.service';
import styles from './styles.module.scss';

export default function UserStatus(props: any) {

  const {
    user,
    getUsers,
    local
  } = props;

  const [status, setStatus] = useState<Status>(user.status);

  const updateUserStatus = async () => {
    await AdminService.updateUserStatus(user.id, status);
    getUsers();
  }

  return (
    <div className='flex w-full justify-end flex-wrap'>
      <select value={status} onChange={(e: any) => { setStatus(e.target.value) }} className={styles.select}>
        <option value={Status.Active}>{Status.Active}</option>
        <option value={Status.Deleted}>{Status.Deleted}</option>
      </select>
      <button className={user.status === status ? styles.button_blue_BG : styles.button_red_BG} onClick={updateUserStatus}>{local.admin.save}</button>
    </div>
  )
}