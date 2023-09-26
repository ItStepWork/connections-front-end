'use client'

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './styles.module.scss';
import SelectedUser from '../selectedUser/page';
import UserStatus from '../userStatus/page';
import UserRole from '../userRole/page';
import { AdminService } from '../../../../../services/admin.service';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

export default function Users(props: any) {

  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [number, setNumber] = useState<number>(1);
  const [time, setTime] = useState<string>("day");

  const filter = (array: any[]) => {
    if (array.length > 0) {
      let text = search.toLowerCase();
      return array.filter((u: any) => u.firstName?.toLowerCase().includes(text) || u.lastName?.toLowerCase().includes(text) || u.email?.toLowerCase().includes(text) || u.phone?.toLowerCase().includes(text) || (u.firstName?.toLowerCase() + " " + u.lastName?.toLowerCase()).includes(text) || (u.lastName?.toLowerCase() + " " + u.firstName?.toLowerCase()).includes(text));
    }
    else return [];
  }

  const updateUserBlockingTime = async (userId: string, time: string, number: number) => {
    let date = new Date();
    if (time === "hour") date.setHours(date.getHours() + (Number)(number));
    if (time === "day") date.setDate(date.getDate() + (Number)(number));
    if (time === "month") date.setMonth(date.getMonth() + (Number)(number));
    if (time === "year") date.setFullYear(date.getFullYear() + (Number)(number));
    console.log(date.toUTCString())
    await AdminService.updateUserBlockingTime(userId, date.toUTCString());
    props.getUsers();
  }

  return (
    <div className={styles.container}>
      <div className='flex m-6'>
        Blocking settings:
        <select className={styles.select} value={number} onChange={(e: any) => { setNumber(e.target.value); }}>
          {array.map(number => (
            <option value={number}>{number}</option>
          ))}
        </select>
        <select className={styles.select} value={time} onChange={(e: any) => { setTime(e.target.value); }}>
          <option value={"hour"}>hour</option>
          <option value={"day"}>day</option>
          <option value={"month"}>month</option>
          <option value={"year"}>year</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <span className={styles.iconSearch}>
          <FiSearch size={20} />
        </span>
        <input type="text" className={styles.inputSearch} placeholder="Enter user name or email" value={search} onChange={(e) => { setSearch(e.target.value) }} />
      </div>
      <div className='m-6'>
        <table className={styles.table}>
          <thead>
            {filter(props.users).map((user, index) => {
              return (
                <tr key={user.id} className={styles.tr}>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Role</th>
                  <th className={styles.th}>Action</th>
                </tr>
              );
            })}
          </thead>
          <tbody className="flex-1">
            {filter(props.users).map((user, index) => {
              return (
                <tr key={user.id} className={styles.tr}>
                  <td className={styles.td + " word-break: break-all"}>{user.email}</td>
                  <td className={styles.td + " word-break: break-all"}>{user.firstName + " " + user.lastName}</td>
                  <td className={styles.td}><UserStatus user={user} getUsers={props.getUsers} /></td>
                  <td className={styles.td}><UserRole user={user} getUsers={props.getUsers} /></td>
                  <td className={styles.td}>
                    <div className='flex gap-3'>
                      <button className={styles.button_green_BG} onClick={() => { setSelectedIndex(index); setIsSelected(true); }}>Info</button>
                      {new Date(user.blockingTime) < new Date() ?
                        <button className={styles.button_red_BG} onClick={() => { updateUserBlockingTime(user.id, time, number) }}>Block</button>
                        :
                        <button className={styles.button_blue_BG} onClick={() => { updateUserBlockingTime(user.id, time, 0) }}>Unlock</button>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <SelectedUser isSelected={isSelected} setIsSelected={setIsSelected} users={filter(props.users)} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} getUsers={props.getUsers} />
    </div>
  )
}
