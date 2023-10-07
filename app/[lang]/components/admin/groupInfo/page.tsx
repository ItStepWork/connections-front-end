"use client"

import { toast } from 'react-toastify';
import GroupStatus from '../groupStatus/page';
import styles from './styles.module.scss';

export default function GroupInfo(props: any) {

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
            <th className={styles.th}>{props.local.admin.table.users}</th>
            <th className={styles.th}>{props.local.admin.info.audience}</th>
            <th className={styles.th}>{props.local.admin.info.status}</th>
            <th className={styles.th}>{props.local.admin.info.blockTime}</th>
            <th className={styles.th}>{props.local.admin.info.groupName}</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>{props.local.admin.info.created}</th>
            <th className={styles.th}>{props.local.admin.info.description}</th>
          </tr>
        </thead>
        <tbody className="flex">
          <tr className={styles.tr}>
            <td className={styles.td} onClick={() => { navigator.clipboard.writeText(props.group.id) }}>{props.group.id}</td>
            <td className={styles.td}>{Object.entries(props.group.users).filter(u=>u[1]).length}</td>
            <td className={styles.td}>{props.group.audience}</td>
            <td className={styles.td}>
              <GroupStatus group={props.group} getGroups={props.getGroups} local={props.local}/>
            </td>
            <td className={styles.td}>
              {new Date(props.group.blockingTime) > new Date() ? 
              new Date(props.group.blockingTime).toLocaleString() 
              : 
              "null"}
            </td>
            <td className={styles.td} onClick={() => { copied(props.group.name); }}>{props.group.name}</td>
            <td className={styles.td} onClick={() => { copied(props.group.email); }}>{props.group.email}</td>
            <td className={styles.td}>{props.group.createdTime !== "0001-01-01T00:00:00" ? new Date(props.group.createdTime).toLocaleString() : "null"}</td>
            <td className={styles.td} onClick={() => { copied(props.group.description); }}>{props.group.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}