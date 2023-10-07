"use client"

import { toast } from 'react-toastify';
import UserRole from '../userRole/page';
import UserStatus from '../userStatus/page';
import styles from './styles.module.scss';

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
            <th className={styles.th}>{props.local.admin.info.role}</th>
            <th className={styles.th}>{props.local.admin.info.status}</th>
            <th className={styles.th}>{props.local.admin.info.blockTime}</th>
            <th className={styles.th}>{props.local.admin.info.name}</th>
            <th className={styles.th}>{props.local.admin.info.lastName}</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>{props.local.admin.info.phone}</th>
            <th className={styles.th}>{props.local.admin.info.gender}</th>
            <th className={styles.th}>{props.local.admin.info.lastVisit}</th>
            <th className={styles.th}>{props.local.admin.info.created}</th>
            <th className={styles.th}>{props.local.admin.info.birthday}</th>
            <th className={styles.th}>IpAddress</th>
          </tr>
        </thead>
        <tbody className="flex">
          <tr className={styles.tr}>
            <td className={styles.td} onClick={() => { navigator.clipboard.writeText(props.user.id) }}>{props.user.id}</td>
            <td className={styles.td}>
              <UserRole user={props.user} getUsers={props.getUsers} local={props.local}/>
            </td>
            <td className={styles.td}>
              <UserStatus user={props.user} getUsers={props.getUsers} local={props.local}/>
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