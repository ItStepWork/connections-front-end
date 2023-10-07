'use client'

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AdminService } from '../../../../../services/admin.service';
import SelectedItem from '../selectedItem/page';
import UserInfo from '../userInfo/page';
import UserRole from '../userRole/page';
import UserStatus from '../userStatus/page';
import styles from './styles.module.scss';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

export default function Users(props: any) {

  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [number, setNumber] = useState<number>(1);
  const [time, setTime] = useState<string>("day");

  const filter = () => {
    if (props.users.length > 0) {
      let text = search.toLowerCase();
      return props.users.filter((u: any) => u.firstName?.toLowerCase().includes(text) || u.lastName?.toLowerCase().includes(text) || u.email?.toLowerCase().includes(text) || u.phone?.toLowerCase().includes(text) || (u.firstName?.toLowerCase() + " " + u.lastName?.toLowerCase()).includes(text) || (u.lastName?.toLowerCase() + " " + u.firstName?.toLowerCase()).includes(text));
    }
    else return [];
  }

  const updateUserBlockingTime = async (userId: string, time: string, number: number) => {
    let date = new Date();
    if (time === "hour") date.setHours(date.getHours() + (Number)(number));
    if (time === "day") date.setDate(date.getDate() + (Number)(number));
    if (time === "month") date.setMonth(date.getMonth() + (Number)(number));
    if (time === "year") date.setFullYear(date.getFullYear() + (Number)(number));
    await AdminService.updateUserBlockingTime(userId, date.toUTCString());
    props.getUsers();
  }
  return (
    <div className={styles.container}>
      <div className='flex m-6'>
        {props.local.admin.title}
        <select className={styles.select} value={number} onChange={(e: any) => { setNumber(e.target.value); }}>
          {array.map(number => (
            <option key={number} value={number}>{number}</option>
          ))}
        </select>
        <select className={styles.select} value={time} onChange={(e: any) => { setTime(e.target.value); }}>
          <option value={"hour"}>{props.local.admin.ban.hour}</option>
          <option value={"day"}>{props.local.admin.ban.day}</option>
          <option value={"month"}>{props.local.admin.ban.month}</option>
          <option value={"year"}>{props.local.admin.ban.year}</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <span className={styles.iconSearch}>
          <FiSearch size={20} />
        </span>
        <input type="text" className={styles.inputSearch} placeholder={props.local.search.searchNameOrEmail} value={search} onChange={(e) => { setSearch(e.target.value) }} />
      </div>
      <div className='m-6'>
        <table className={styles.table}>
          <thead>
            {filter().map((user: any, index: number) => {
              return (
                <tr key={user.id} className={styles.tr}>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>{props.local.admin.table.name}</th>
                  <th className={styles.th}>{props.local.admin.table.status}</th>
                  <th className={styles.th}>{props.local.admin.table.role}</th>
                  <th className={styles.th}>{props.local.admin.table.action.title}</th>
                </tr>
              );
            })}
          </thead>
          <tbody className="flex-1">
            {filter().map((user: any, index: number) => {
              return (
                <tr key={user.id} className={styles.tr}>
                  <td className={styles.td + " word-break: break-all"}>{user.email}</td>
                  <td className={styles.td + " word-break: break-all"}>{user.firstName + " " + user.lastName}</td>
                  <td className={styles.td}><UserStatus user={user} getUsers={props.getUsers} local={props.local}/></td>
                  <td className={styles.td}><UserRole user={user} getUsers={props.getUsers} local={props.local}/></td>
                  <td className={styles.td}>
                    <div className='flex gap-3'>
                      <button className={styles.button_green_BG} onClick={() => { setSelectedIndex(index); setIsSelected(true); }}>{props.local.admin.table.action.info}</button>
                      {new Date(user.blockingTime) < new Date() ?
                        <button className={styles.button_red_BG} onClick={() => { updateUserBlockingTime(user.id, time, number) }}>{props.local.admin.table.action.block}</button>
                        :
                        <button className={styles.button_blue_BG} onClick={() => { updateUserBlockingTime(user.id, time, 0) }}>{props.local.admin.table.action.unblock}</button>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <SelectedItem array={filter()} isSelected={isSelected} setIsSelected={setIsSelected} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}>
        <UserInfo user={filter()[selectedIndex]} getUsers={props.getUsers} local={props.local} />
      </SelectedItem>
    </div>
  )
}
