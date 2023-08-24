import { IUser } from '@/dto/sessionDto';
import { MessagingService } from '@/services/messaging.service';
import { useState } from "react";
import { BsFillSendFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import styles from './styles.module.scss';

export function NewMessage(props: any) {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [filterUsers, setFilterUsers] = useState([]);
  const [findUser, setFindUser] = useState(null);

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

  const select =(find: any)=> {
    if (find !== findUser) {
      setFindUser(find);
    }
  }

  const sendMessage = async (mess:string, find: IUser) => {
    if (findUser !== null) {
      const formData = new FormData();
      formData.append("id", find.id);
      formData.append("text", mess);

      await MessagingService.sendMessage(formData);
      setMessage("");
      props.loadDialogs();
    }
  }

  return (
    <div className={styles.newMessageContent}>
            <div className="flex">
              <span className={styles.iconSearch}>
                <FaCircleUser size={20} />
              </span>
              <input type="text" className={styles.inputSearch} placeholder="Введите имя" onChange={(e) => { changeSearch(e) }} value={search} />
            </div>
            <ul className={styles.users + " h-2/4 overflow-auto"}>
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
            <div className='flex justify-between'>
              <textarea className={styles.textarea} onChange={(e)=>{setMessage(e.target.value)}} value={message}></textarea>
              <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={()=>{if(findUser !== null)sendMessage(message, findUser);}}>
                  <BsFillSendFill className='fill-white' />
                </button>
              </div>
            </div>
          </div>
  )
}