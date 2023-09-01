import { useState } from 'react';
import { ConnectionBlock } from './connectionBlock';
import { Window } from '@/components/messaging/window/page';
import styles from './connectionsCard.module.scss';
import { BsFillSendFill } from 'react-icons/bs';
import { MessagingService } from '@/services/messaging.service';
import FooterBlock from '@/components/messaging/footerBlock/page';
import { FiSearch } from 'react-icons/fi';

export const ConnectionsCard = (props: any) => {
  const [count, setCount] = useState(3)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null)

  const [users, setUsers] = useState(props.users);
  const [search, setSearch] = useState("");

  const sendMessage = async (mess: string) => {
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("text", mess);
    await MessagingService.sendMessage(formData);
    setMessage("");
  }
  const changeSearch = (event: any) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setUsers(props.users);
    }
    else {
      let search = event.target.value.toLowerCase();
      let searchUsers = props.users.filter((g: any) => g.firstName?.toLowerCase().includes(search) || g.lastName?.toLowerCase().includes(search));
      setUsers(searchUsers);
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div className="flex mb-6">
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder="Введите имя или фамилию" onChange={(e) => { changeSearch(e) }} value={search} />
        </div>
        {users.map((user: any, index: any) => {
          if (index <= count) {
            return (<ConnectionBlock isRequests={props.isRequests} setUser={setUser} setIsOpen={setIsOpen} key={index} user={user} group={props.group} session={props.session} getGroup={props.getGroup} getUsers={props.getUsers} />)
          }
        })}
        <button className={styles.buttonLoadMore} onClick={() => setCount(count + 4)}>Загрузить еще</button>
      </div >
      {user
        && <Window name={user.firstName + " " + user.lastName} isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className='flex h-5/6 justify-center items-end'>
            <FooterBlock friendId={user.id} />
          </div>
        </Window>
      }
    </>
  )
}