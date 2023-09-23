"use client"

import styles from './styles.module.scss';

export default function UserInfo(props: any) {

  return (
    <div className='flex flex-col justify-between m-3'>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Gender</th>
            <th className={styles.th}>BirthDay</th>
          </tr>
        </thead>
        <tbody className="flex">
          <tr className={styles.tr}>
            <td className={styles.td}>{props.user.email}</td>
            <td className={styles.td}>{props.user.firstName + " " + props.user.lastName}</td>
            <td className={styles.td}>{props.user.gender}</td>
            <td className={styles.td}>{props.user.birthDay !== "0001-01-01T00:00:00" ? new Date(props.user.birthDay).toLocaleDateString() : "null"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}