import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import FooterBlock from '../../messaging/footerBlock/page';
import Window from '../../messaging/window/page';
import { ConnectionBlock } from './connectionBlock';
import styles from './connectionsCard.module.scss';

export const ConnectionsCard = (props: any) => {
  const [count, setCount] = useState(3)
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState(props.users);
  const [search, setSearch] = useState("");
  const changeSearch = (event: any) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setUsers(props.users);
    }
    else {
      let search = event.target.value.toLowerCase();
      let searchUsers = props.users.filter((u: any) => u.firstName?.toLowerCase().includes(search) || u.lastName?.toLowerCase().includes(search)
        || search.toLowerCase() === u.firstName.toLowerCase() + " " + u.lastName.toLowerCase() || search.toLowerCase() === u.lastName.toLowerCase() + " " + u.firstName.toLowerCase());
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
        {users?.map((user: any, index: any) => {
          return (<ConnectionBlock isRequests={props.isRequests} setUser={setUser} setIsOpen={setIsOpen} key={user.id + user.friendStatus} user={user} group={props.group} session={props.session}
            getGroup={props.getGroup} getUsers={props.getUsers} />)
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