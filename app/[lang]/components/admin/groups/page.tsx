'use client'

import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './styles.module.scss';
import { AdminService } from '../../../../../services/admin.service';
import GroupStatus from '../groupStatus/page';
import SelectedGroup from '../selectedGroup/page';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

export default function Groups(props: any) {

  const [groups, setGroups] = useState<any[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [number, setNumber] = useState<number>(1);
  const [time, setTime] = useState<string>("day");

  useEffect(() => {
    getGroups();
  }, [])

  const getGroups = async () => {
    let result = await AdminService.getGroups();
    setGroups(result);
  }

  const filter = () => {
    if (groups.length > 0) {
      let text = search.toLowerCase();
      return groups.filter((u: any) => u.name?.toLowerCase().includes(text) || u.email?.toLowerCase().includes(text));
    }
    else return [];
  }

  const updateGroupBlockingTime = async (groupId: string, time: string, number: number) => {
    let date = new Date();
    if (time === "hour") date.setHours(date.getHours() + (Number)(number));
    if (time === "day") date.setDate(date.getDate() + (Number)(number));
    if (time === "month") date.setMonth(date.getMonth() + (Number)(number));
    if (time === "year") date.setFullYear(date.getFullYear() + (Number)(number));
    await AdminService.updateGroupBlockingTime(groupId, date.toUTCString());
    getGroups();
  }

  return (
    <div className={styles.container}>
      <div className='flex m-6'>
        Blocking settings:
        <select className={styles.select} value={number} onChange={(e: any) => { setNumber(e.target.value); }}>
          {array.map(number => (
            <option key={number} value={number}>{number}</option>
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
        <input type="text" className={styles.inputSearch} placeholder="Enter group name or email" value={search} onChange={(e) => { setSearch(e.target.value) }} />
      </div>
      <div className='m-6'>
        <table className={styles.table}>
          <thead>
            {filter().map((group, index) => {
              return (
                <tr key={group.id} className={styles.tr}>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Action</th>
                </tr>
              );
            })}
          </thead>
          <tbody className="flex-1">
            {filter().map((group, index) => {
              return (
                <tr key={group.id} className={styles.tr}>
                  <td className={styles.td + " word-break: break-all"}>{group.email}</td>
                  <td className={styles.td + " word-break: break-all"}>{group.name}</td>
                  <td className={styles.td}><GroupStatus group={group} getGroups={getGroups} /></td>
                  <td className={styles.td}>
                    <div className='flex gap-3'>
                      <button className={styles.button_green_BG} onClick={() => { setSelectedIndex(index); setIsSelected(true); }}>Info</button>
                      {new Date(group.blockingTime) < new Date() ?
                        <button className={styles.button_red_BG} onClick={() => { updateGroupBlockingTime(group.id, time, number) }}>Block</button>
                        :
                        <button className={styles.button_blue_BG} onClick={() => { updateGroupBlockingTime(group.id, time, 0) }}>Unlock</button>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <SelectedGroup isSelected={isSelected} setIsSelected={setIsSelected} groups={filter()} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} getGroups={getGroups} />
    </div>
  )
}
