import { useEffect, useState } from 'react';
import { ConnectionBlock } from './connectionBlock';
import { Window } from '@/components/messaging/window/page';
import styles from './connectionsCard.module.scss';
import { BsFillSendFill } from 'react-icons/bs';
import { MessagingService } from '@/services/messaging.service';
import FooterBlock from '@/components/messaging/footerBlock/page';
import { FiSearch } from 'react-icons/fi';
import { FriendService } from '@/services/friend.service';

export const ConnectionsCard = (props: any) => {
  const [count, setCount] = useState(3)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null)
  const [confirmedUsers, setConfirmedUsers] = useState<any[]>([]);
  const [unconfirmedUsers, setUnconfirmedUsers] = useState<any[]>([]);
  const [waitingUsers, setWaitingUsers] = useState<any[]>([]);
  const [otherUsers, setOtherUsers] = useState<any[]>([]);

  const [users, setUsers] = useState(props.users);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getUsers();
  }, [])

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
      let searchUsers = props.users.filter((u: any) => u.firstName?.toLowerCase().includes(search) || u.lastName?.toLowerCase().includes(search));
      setUsers(searchUsers);
    }
  }
  const getUsers = async () => {
    let result1 = await FriendService.getConfirmedFriends(props.session.user.id);
    setConfirmedUsers(result1);
    // setConfirmedUsersFilter(result1);
    let result2 = await FriendService.getUnconfirmedFriends(props.session.user.id);
    setUnconfirmedUsers(result2);
    // setUnconfirmedUsersFilter(result2);
    let result3 = await FriendService.getWaitingFriends(props.session.user.id);
    setWaitingUsers(result3);
    // setWaitingUsersFilter(result3);
    let result4 = await FriendService.getOtherUsers(props.userId);
    setOtherUsers(result4);
    // setOtherUsersFilter(result4);
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
          if (index <= count) {
            return (<ConnectionBlock isRequests={props.isRequests} setUser={setUser} setIsOpen={setIsOpen} key={user.id + otherUsers.length} user={user} group={props.group} session={props.session}
              getGroup={props.getGroup} getUsers={props.getUsers} getAllUsers={getUsers} confirmedUsers={confirmedUsers} unconfirmedUsers={unconfirmedUsers} waitingUsers={waitingUsers} />)
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