"use client"
import { useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import FooterBlock from '../footerBlock/page';
import styles from './styles.module.scss';

export default function NewMessage(props: any) {

  const {
    users,
    local
  } = props; 

  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState([]);
  const [findUser, setFindUser] = useState<any>(null);

  const changeSearch = (event: any) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setFilterUsers(users);
    }
    else {
      let search = event.target.value.toLowerCase();
      let usersSearch = users.filter((u: any) => u.firstName?.toLowerCase().includes(search) || u.lastName?.toLowerCase().includes(search) || u.email?.toLowerCase().includes(search) || u.phone?.toLowerCase().includes(search) || (u.firstName?.toLowerCase() + " " + u.lastName?.toLowerCase()).includes(search) || (u.lastName?.toLowerCase() + " " + u.firstName?.toLowerCase()).includes(search));
      setFilterUsers(usersSearch);
    }
  }

  const select = (find: any) => {
    if (find !== findUser) {
      setFindUser(find);
    }
  }

  return (
    <div className={styles.newMessageContent}>
      <div className="flex m-3">
        <span className={styles.iconSearch}>
          <FaCircleUser size={20} />
        </span>
        <input type="text" className={styles.inputSearch} placeholder={local.chat.enterName} onChange={(e) => { changeSearch(e) }} value={search} />
      </div>
      <ul className={styles.users + " h-max overflow-y-auto mx-3"}>
        {filterUsers.map((user: any, index: any) =>
          <li key={index} onClick={() => select(user)} {...findUser === user ? { className: "mx-2 bg-slate-200 rounded-lg dark:bg-zinc-700" } : { className: "mx-2" }}>
            <div className={styles.user}>
              {user.avatarUrl ? (<img className={styles.userImage} src={user.avatarUrl} />) : (<FaUserCircle className={styles.userImage} />)}
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.firstName} {user.lastName}</span>
              </div>
            </div>
          </li>
        )}
      </ul>
      {findUser?(<FooterBlock friendId={findUser.id} local={local}/>):(<></>)}
    </div>
  )
}