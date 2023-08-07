import styles from './styles.module.scss'
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { FaCircleUser } from 'react-icons/fa6';
import { BsFillSendFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from "react";
import { IUser } from '@/dto/sessionDto';

export function NewMessage(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNewMessage, setIsOpenNewMessage] = useState(false);
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

      const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "User/SendMessage", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + props.token
        },
        body: formData,
      });

      setMessage("");
      if (response.ok) {
        props.loadDialogs();
      }
    }
  }

  return (
    <div>
      <div className='m-3 flex justify-between items-center'>
        <h2>Активные чаты <span className={styles.chats}>{props.length}</span></h2>
        <button onClick={() => { setIsOpen(!isOpen); setIsOpenNewMessage(true); }} onFocus={() => { if (isOpen) setIsOpen(true) }} onBlur={() => setIsOpen(false)} >

          <HiMiniPencilSquare size={40} {...isOpen ? { className: "bg-buttonBlue p-3 rounded-full fill-white" } : { className: "bg-buttonBlueOpacity p-3 rounded-full fill-buttonBlue" }} />
        </button>
      </div>
      <hr className={styles.horizontalHr} />

      <div {...isOpenNewMessage ? { className: styles.newMessage + " visible z-50" } : { className: styles.newMessage + " invisible z-50" }}>
        <div className={styles.newMessageContainer}>
          <div className={styles.newMessageHeader}>
            <h2>Новое сообщение</h2>
            <button onClick={() => setIsOpenNewMessage(false)}>
              <IoMdClose size={26} className={styles.buttonClose} />
            </button>
          </div>
          <hr className={styles.horizontalHr} />
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
        </div>
      </div>
    </div>
  )
}