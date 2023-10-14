"use client"

import { toast } from 'react-toastify';
import UserRole from '../userRole/page';
import UserStatus from '../userStatus/page';
import styles from './styles.module.scss';

export default function UserInfo(props: any) {

  const {
    local,
    getUsers,
    user
  } = props;

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
            <th className={styles.th}>{local.admin.info.role}</th>
            <th className={styles.th}>{local.admin.info.status}</th>
            <th className={styles.th}>{local.admin.info.blockTime}</th>
            <th className={styles.th}>{local.admin.info.name}</th>
            <th className={styles.th}>{local.admin.info.lastName}</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>{local.admin.info.phone}</th>
            <th className={styles.th}>{local.admin.info.gender}</th>
            <th className={styles.th}>{local.admin.info.lastVisit}</th>
            <th className={styles.th}>{local.admin.info.created}</th>
            <th className={styles.th}>{local.admin.info.birthday}</th>
            <th className={styles.th}>IpAddress</th>
          </tr>
        </thead>
        <tbody className="flex">
          <tr className={styles.tr}>
            <td className={styles.td} onClick={() => { navigator.clipboard.writeText(user.id) }}>{user.id}</td>
            <td className={styles.td}>
              <UserRole user={user} getUsers={getUsers} local={local}/>
            </td>
            <td className={styles.td}>
              <UserStatus user={user} getUsers={getUsers} local={local}/>
            </td>
            <td className={styles.td}>
              {new Date(user.blockingTime) > new Date() ? 
              new Date(user.blockingTime).toLocaleString() 
              : 
              "null"}
            </td>
            <td className={styles.td} onClick={() => { copied(user.firstName); }}>{user.firstName}</td>
            <td className={styles.td} onClick={() => { copied(user.lastName); }}>{user.lastName}</td>
            <td className={styles.td} onClick={() => { copied(user.email); }}>{user.email}</td>
            <td className={styles.td} onClick={() => { copied(user.phone); }}>{user.phone}</td>
            <td className={styles.td}>{user.gender}</td>
            <td className={styles.td}>{user.lastVisit !== "0001-01-01T00:00:00" ? new Date(user.lastVisit).toLocaleString() : "null"}</td>
            <td className={styles.td}>{user.createdTime !== "0001-01-01T00:00:00" ? new Date(user.createdTime).toLocaleString() : "null"}</td>
            <td className={styles.td}>{user.birthDay !== "0001-01-01T00:00:00" ? new Date(user.birthDay).toLocaleDateString() : "null"}</td>
            <td className={styles.td} onClick={() => { copied(user.ipAddress); }}>{user.ipAddress}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}