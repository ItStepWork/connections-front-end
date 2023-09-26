"use client"

import { useState } from 'react';
import { Status } from '../../../../../enums/all.enum';
import styles from './styles.module.scss';
import { AdminService } from '../../../../../services/admin.service';

export default function GroupStatus(props: any) {
  const [status, setStatus] = useState<Status>(props.group.status);

  const updateGroupStatus = async () => {
    await AdminService.updateGroupStatus(props.group.id, status);
    props.getGroups();
  }

  return (
    <div className='flex w-full justify-between'>
      <select value={status} onChange={(e: any) => { setStatus(e.target.value) }} className={styles.select}>
        <option value={Status.Active}>{Status.Active}</option>
        <option value={Status.Deleted}>{Status.Deleted}</option>
      </select>
      <button className={props.group.status === status ? styles.button_blue_BG : styles.button_red_BG} onClick={updateGroupStatus}>Save</button>
    </div>
  )
}