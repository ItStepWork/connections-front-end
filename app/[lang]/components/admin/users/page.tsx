'use client'

import { useEffect, useState } from 'react';
import { AdminService } from '../../../../../services/admin.service';
import { FiSearch } from 'react-icons/fi';
import styles from './styles.module.scss';
import './table.css'

export default function Users(props: any) {

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");

  const load = async () => {
    let result = await AdminService.getUsers();
    setUsers(result);
  }

  useEffect(() => {
    load();
  }, [])

  const filter = (array: any[]) => {
    return array.filter((u: any) => u.firstName?.toLowerCase().includes(search) || u.lastName?.toLowerCase().includes(search) || u.email?.toLowerCase().includes(search) || u.phone?.toLowerCase().includes(search) || (u.firstName?.toLowerCase() + " " + u.lastName?.toLowerCase()).includes(search) || (u.lastName?.toLowerCase() + " " + u.firstName?.toLowerCase()).includes(search));
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <span className={styles.iconSearch}>
          <FiSearch size={20} />
        </span>
        <input type="text" className={styles.inputSearch} placeholder="Enter user name or email" value={search} onChange={(e) => { setSearch(e.target.value.toLocaleLowerCase()) }} />
      </div>
      <div className='m-6'>
        <table className={styles.table}>
          <thead>
            {filter(users).map((user, index) => {
              return (
                <tr key={user.id} className="text-sm flex flex-col flex-nowrap sm:table-row md:rounded-l-lg rounded-none md:mb-2 mb-0 border border-light_border dark:border-dark_border">
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Gender</th>
                  <th className={styles.th}>Action</th>
                </tr>
              );
            })}
          </thead>
          <tbody className="flex-1">
            {filter(users).map((user, index) => {
              return (
                <tr key={user.id} className="text-sm flex flex-col flex-nowrap sm:table-row md:rounded-l-lg rounded-none md:mb-2 mb-0 border border-light_border dark:border-dark_border">
                  <td className={styles.td}>{user.email}</td>
                  <td className={styles.td}>{user.firstName + " " + user.lastName}</td>
                  <td className={styles.td}>{user.gender}</td>
                  <td className={styles.td}>
                    <div className='flex gap-5'>
                      <button className={styles.button_red_BG}>Remove</button>
                      <button className={styles.button_blue_BG}>Info</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
