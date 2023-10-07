"use client"

import { useState } from 'react';
import { Status } from '../../../../../enums/all.enum';
import { AdminService } from '../../../../../services/admin.service';
import styles from './styles.module.scss';

export default function PostStatus(props: any) {
  const [status, setStatus] = useState<Status>(props.post.status);

  const updateGroupStatus = async () => {
    await AdminService.updatePostStatus(props.post.recipientId, props.post.id, status);
    props.load();
  }

  return (
    <div className='flex w-full justify-between'>
      <select value={status} onChange={(e: any) => { setStatus(e.target.value) }} className={styles.select}>
        <option value={Status.Active}>{Status.Active}</option>
        <option value={Status.Deleted}>{Status.Deleted}</option>
      </select>
      <button className={props.post.status === status ? styles.button_blue_BG : styles.button_red_BG} onClick={updateGroupStatus}>{props.local.admin.save}</button>
    </div>
  )
}