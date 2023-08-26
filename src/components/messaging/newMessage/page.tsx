import { useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import styles from './styles.module.scss';
import FooterBlock from '../footerBlock/page';

export function NewMessage(props: any) {
  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState([]);
  const [findUser, setFindUser] = useState<any>(null);

  const changeSearch = (event: any) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setFilterUsers(props.users);
    }
    else {
      let search = event.target.value.toLowerCase();
      let users = props.users.filter((u: any) => u.firstName?.toLowerCase().includes(search) || u.lastName?.toLowerCase().includes(search) || u.email?.toLowerCase().includes(search) || u.phone?.toLowerCase().includes(search) || (u.firstName?.toLowerCase() + " " + u.lastName?.toLowerCase()).includes(search) || (u.lastName?.toLowerCase() + " " + u.firstName?.toLowerCase()).includes(search));
      setFilterUsers(users);
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
        <input type="text" className={styles.inputSearch} placeholder="Введите имя" onChange={(e) => { changeSearch(e) }} value={search} />
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
      {findUser?(<FooterBlock friendId={findUser.id} loadDialogs={props.loadDialogs} />):(<></>)}
    </div>
  )
}