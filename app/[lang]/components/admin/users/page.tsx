'use client'

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './styles.module.scss';
import SelectedUser from '../selectedUser/page';

export default function Users(props: any) {

  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const filter = (array: any[]) => {
    if(array.length > 0){
      let text = search.toLowerCase();
      return array.filter((u: any) => u.firstName?.toLowerCase().includes(text) || u.lastName?.toLowerCase().includes(text) || u.email?.toLowerCase().includes(text) || u.phone?.toLowerCase().includes(text) || (u.firstName?.toLowerCase() + " " + u.lastName?.toLowerCase()).includes(text) || (u.lastName?.toLowerCase() + " " + u.firstName?.toLowerCase()).includes(text));  
    }
    else return [];
  }
  
  return (
    <div className={styles.container}>
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
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Gender</th>
                  <th className={styles.th}>BirthDay</th>
                  <th className={styles.th}>Action</th>
                </tr>
              );
            })}
          </thead>
          <tbody className="flex-1">
            {filter(props.users).map((user, index) => {
              return (
                <tr key={user.id} className={styles.tr}>
                  <td className={styles.td}>{user.email}</td>
                  <td className={styles.td}>{user.firstName + " " + user.lastName}</td>
                  <td className={styles.td}>{user.gender}</td>
                  <td className={styles.td}>{user.birthDay !== "0001-01-01T00:00:00" ? new Date(user.birthDay).toLocaleDateString() : "null"}</td>
                  <td className={styles.td}>
                    <div className='flex gap-5'>
                      <button className={styles.button_red_BG}>Remove</button>
                      <button className={styles.button_blue_BG} onClick={()=>{setSelectedIndex(index); setIsSelected(true);}}>Info</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <SelectedUser isSelected={isSelected} setIsSelected={setIsSelected} users={filter(props.users)} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
    </div>
  )
}
