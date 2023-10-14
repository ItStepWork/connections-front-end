"use client"

import { useState } from 'react';
import { Status } from '../../../../../enums/all.enum';
import { AdminService } from '../../../../../services/admin.service';
import styles from './styles.module.scss';

export default function GroupStatus(props: any) {

  const {
    getGroups,
    group,
    local
  } = props;

  const [status, setStatus] = useState<Status>(group.status);

  const updateGroupStatus = async () => {
    await AdminService.updateGroupStatus(group.id, status);
    getGroups();
  }

  return (
    <div className='flex w-full justify-end flex-wrap'>
      <select value={status} onChange={(e: any) => { setStatus(e.target.value) }} className={styles.select}>
        <option value={Status.Active}>{Status.Active}</option>
        <option value={Status.Deleted}>{Status.Deleted}</option>
      </select>
      <button className={group.status === status ? styles.button_blue_BG : styles.button_red_BG} onClick={updateGroupStatus}>{local.admin.save}</button>
    </div>
  )
}