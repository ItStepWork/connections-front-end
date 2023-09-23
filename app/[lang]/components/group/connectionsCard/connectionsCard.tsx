import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import FooterBlock from '../../messaging/footerBlock/page';
import Window from '../../messaging/window/page';
import { ConnectionBlock } from './connectionBlock';
import styles from './connectionsCard.module.scss';

export const ConnectionsCard = (props: any) => {
  const [count, setCount] = useState(3)
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [search, setSearch] = useState("");
  const changeSearch = (event: any) => {
    setCount(3);
    setSearch(event.target.value);
  }
  const filter = (array: any[]) => {
    return array.filter((u: any) => u.firstName?.toLowerCase().includes(search.toLowerCase()) || u.lastName?.toLowerCase().includes(search.toLowerCase())
      || search.toLowerCase() === u.firstName.toLowerCase() + " " + u.lastName.toLowerCase() || search.toLowerCase() === u.lastName.toLowerCase() + " " + u.firstName.toLowerCase());
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder={props.local.search.searchFullName} onChange={(e) => { changeSearch(e) }} value={search} />
        </div>
        {props.users && filter(props.users).map((user: any, index: any) => {
          if (index <= count)
            return (<ConnectionBlock isRequests={props.isRequests} setUser={setUser} setIsOpen={setIsOpen} key={user.id + user.friendStatus} user={user} group={props.group} session={props.session}
              getGroup={props.getGroup} getUsers={props.getUsers} local={props.local}/>)
        })}
        {count < props.users.length - 1 && <button className={styles.buttonLoadMore} onClick={() => setCount(count + 4)}>{props.local.button.uploadMore}</button>}
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