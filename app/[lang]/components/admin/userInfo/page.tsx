"use client"

import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import UserRole from '../userRole/page';
import UserStatus from '../userStatus/page';

export default function UserInfo(props: any) {

  const copied = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.info("Copied", {});
  }

  return (
    <div className='flex justify-center'>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Id</th>
            <th className={styles.th}>Role</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>BlockTime</th>
            <th className={styles.th}>FirstName</th>
            <th className={styles.th}>LastName</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Phone</th>
            <th className={styles.th}>Gender</th>
            <th className={styles.th}>LastVisit</th>
            <th className={styles.th}>Created</th>
            <th className={styles.th}>BirthDay</th>
            <th className={styles.th}>IpAddress</th>
          </tr>
        </thead>
        <tbody className="flex">
          <tr className={styles.tr}>
            <td className={styles.td} onClick={() => { navigator.clipboard.writeText(props.user.id) }}>{props.user.id}</td>
            <td className={styles.td}>
              <UserRole user={props.user} getUsers={props.getUsers} />
            </td>
            <td className={styles.td}>
              <UserStatus user={props.user} getUsers={props.getUsers} />
            </td>
            <td className={styles.td}>
              {new Date(props.user.blockingTime) > new Date() ? 
              new Date(props.user.blockingTime).toLocaleString() 
              : 
              "null"}
            </td>
            <td className={styles.td} onClick={() => { copied(props.user.firstName); }}>{props.user.firstName}</td>
            <td className={styles.td} onClick={() => { copied(props.user.lastName); }}>{props.user.lastName}</td>
            <td className={styles.td} onClick={() => { copied(props.user.email); }}>{props.user.email}</td>
            <td className={styles.td} onClick={() => { copied(props.user.phone); }}>{props.user.phone}</td>
            <td className={styles.td}>{props.user.gender}</td>
            <td className={styles.td}>{props.user.lastVisit !== "0001-01-01T00:00:00" ? new Date(props.user.lastVisit).toLocaleString() : "null"}</td>
            <td className={styles.td}>{props.user.createdTime !== "0001-01-01T00:00:00" ? new Date(props.user.createdTime).toLocaleString() : "null"}</td>
            <td className={styles.td}>{props.user.birthDay !== "0001-01-01T00:00:00" ? new Date(props.user.birthDay).toLocaleDateString() : "null"}</td>
            <td className={styles.td} onClick={() => { copied(props.user.ipAddress); }}>{props.user.ipAddress}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}