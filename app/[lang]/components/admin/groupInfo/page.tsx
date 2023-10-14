"use client"

import { toast } from 'react-toastify';
import GroupStatus from '../groupStatus/page';
import styles from './styles.module.scss';

export default function GroupInfo(props: any) {

  const {
    local,
    group,
    getGroups
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
            <th className={styles.th}>{local.admin.table.users}</th>
            <th className={styles.th}>{local.admin.info.audience}</th>
            <th className={styles.th}>{local.admin.info.status}</th>
            <th className={styles.th}>{local.admin.info.blockTime}</th>
            <th className={styles.th}>{local.admin.info.groupName}</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>{local.admin.info.created}</th>
            <th className={styles.th}>{local.admin.info.description}</th>
          </tr>
        </thead>
        <tbody className="flex">
          <tr className={styles.tr}>
            <td className={styles.td} onClick={() => { navigator.clipboard.writeText(group.id) }}>{group.id}</td>
            <td className={styles.td}>{Object.entries(group.users).filter(u=>u[1]).length}</td>
            <td className={styles.td}>{group.audience}</td>
            <td className={styles.td}>
              <GroupStatus group={group} getGroups={getGroups} local={local}/>
            </td>
            <td className={styles.td}>
              {new Date(group.blockingTime) > new Date() ? 
              new Date(group.blockingTime).toLocaleString() 
              : 
              "null"}
            </td>
            <td className={styles.td} onClick={() => { copied(group.name); }}>{group.name}</td>
            <td className={styles.td} onClick={() => { copied(group.email); }}>{group.email}</td>
            <td className={styles.td}>{group.createdTime !== "0001-01-01T00:00:00" ? new Date(group.createdTime).toLocaleString() : "null"}</td>
            <td className={styles.td} onClick={() => { copied(group.description); }}>{group.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}