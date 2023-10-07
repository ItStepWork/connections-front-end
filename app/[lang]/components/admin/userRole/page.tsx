"use client"

import { useState } from 'react';
import { Role } from '../../../../../enums/all.enum';
import { AdminService } from '../../../../../services/admin.service';
import styles from './styles.module.scss';

export default function UserRole(props: any) {
  const [role, setRole] = useState<Role>(props.user.role);

  const updateUserRole = async () => {
    await AdminService.updateUserRole(props.user.id, role);
    props.getUsers();
  }

  return (
    <div className='flex w-full justify-between'>
      <select value={role} onChange={(e: any) => { setRole(e.target.value) }} className={styles.select}>
        <option value={Role.User}>{Role.User}</option>
        <option value={Role.Moderator}>{Role.Moderator}</option>
        <option value={Role.Admin}>{Role.Admin}</option>
      </select>
      <button  className={props.user.role === role ? styles.button_blue_BG : styles.button_red_BG} onClick={updateUserRole}>{props.local.admin.save}</button>
    </div>
  )
}