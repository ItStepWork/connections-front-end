"use client"

import { Role, Status } from '../../../../../enums/all.enum';
import styles from './styles.module.scss';

export default function UserInfo(props: any) {

  return (
    <div className='flex justify-center'>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Id</th>
            <th className={styles.th}>Role</th>
            <th className={styles.th}>Status</th>
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
            <td className={styles.td} onClick={() => {navigator.clipboard.writeText(props.user.id)}}>{props.user.id}</td>
            <td className={styles.td}>
              <div className='flex w-full justify-between'>
                <select defaultValue={props.user.role} className={styles.select}>
                  <option value={Role.User}>{Role.User}</option>
                  <option value={Role.Moderator}>{Role.Moderator}</option>
                  <option value={Role.Admin}>{Role.Admin}</option>
                </select>
                <button className={styles.button_blue_BG}>Save</button>
              </div>
            </td>
            <td className={styles.td}>
              <div className='flex w-full justify-between'>
                <select defaultValue={props.user.status} className={styles.select}>
                  <option value={Status.Active}>{Status.Active}</option>
                  <option value={Status.Deleted}>{Status.Deleted}</option>
                </select>
                <button className={styles.button_blue_BG}>Save</button>
              </div>
            </td>
            <td className={styles.td} onClick={() => {navigator.clipboard.writeText(props.user.firstName)}}>{props.user.firstName}</td>
            <td className={styles.td} onClick={() => {navigator.clipboard.writeText(props.user.lastName)}}>{props.user.lastName}</td>
            <td className={styles.td} onClick={() => {navigator.clipboard.writeText(props.user.email)}}>{props.user.email}</td>
            <td className={styles.td} onClick={() => {navigator.clipboard.writeText(props.user.phone)}}>{props.user.phone}</td>
            <td className={styles.td}>{props.user.gender}</td>
            <td className={styles.td}>{props.user.lastVisit !== "0001-01-01T00:00:00" ? new Date(props.user.lastVisit).toLocaleString() : "null"}</td>
            <td className={styles.td}>{props.user.createdTime !== "0001-01-01T00:00:00" ? new Date(props.user.createdTime).toLocaleString() : "null"}</td>
            <td className={styles.td}>{props.user.birthDay !== "0001-01-01T00:00:00" ? new Date(props.user.birthDay).toLocaleDateString() : "null"}</td>
            <td className={styles.td} onClick={() => {navigator.clipboard.writeText(props.user.ipAddress)}}>{props.user.ipAddress}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}