import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FriendStatus } from '../../../../../enums/all.enum';
import { FriendService } from '../../../../../services/friend.service';
import FooterBlock from '../../messaging/footerBlock/page';
import { Window } from '../../messaging/window/page';
import { ConnectionBlock } from './connectionBlock';
import styles from './connectionsCard.module.scss';

export const ConnectionsCard = (props: any) => {
  const [count, setCount] = useState(3)
  const [isOpen, setIsOpen] = useState(false)
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
    let result2 = await FriendService.getUnconfirmedFriends(props.session.user.id);
    setUnconfirmedUsers(result2);
    let result3 = await FriendService.getWaitingFriends(props.session.user.id);
    setWaitingUsers(result3);
    let result4 = await FriendService.getOtherUsers(props.session.user.id);
    setOtherUsers(result4);
    // setUsers(props.users)
  }
  const isConfirmed = (id: any) => {
    let result = confirmedUsers.filter((u: any) => u.id?.includes(id));
    if (result.length > 0) return true;
    else return false;
  }
  const isUnConfirmed = (id: any) => {
    let result = unconfirmedUsers.filter((u: any) => u.id?.includes(id));
    if (result.length > 0) return true;
    else return false;
  }
  const isWaitingUsers = (id: any) => {
    let result = waitingUsers.filter((u: any) => u.id?.includes(id));
    if (result.length > 0) return true;
    else return false;
  }
  const isOtherUsers = (id: any) => {
    let result = otherUsers.filter((u: any) => u.id?.includes(id));
    if (result.length > 0) return true;
    else return false;
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
            if (isConfirmed(user.id)) return (<ConnectionBlock status={FriendStatus.Confirmed} isRequests={props.isRequests} setUser={setUser} setIsOpen={setIsOpen} key={user.id + otherUsers.length} user={user} group={props.group} session={props.session}
              getGroup={props.getGroup} getUsers={props.getUsers} getAllUsers={getUsers} confirmedUsers={confirmedUsers} unconfirmedUsers={unconfirmedUsers} waitingUsers={waitingUsers} />)
            else if (isUnConfirmed(user.id)) return (<ConnectionBlock status={FriendStatus.Unconfirmed} isRequests={props.isRequests} setUser={setUser} setIsOpen={setIsOpen} key={user.id + otherUsers.length} user={user} group={props.group} session={props.session}
              getGroup={props.getGroup} getUsers={props.getUsers} getAllUsers={getUsers} confirmedUsers={confirmedUsers} unconfirmedUsers={unconfirmedUsers} waitingUsers={waitingUsers} />)
            else if (isWaitingUsers(user.id)) return (<ConnectionBlock status={FriendStatus.Waiting} isRequests={props.isRequests} setUser={setUser} setIsOpen={setIsOpen} key={user.id + otherUsers.length} user={user} group={props.group} session={props.session}
              getGroup={props.getGroup} getUsers={props.getUsers} getAllUsers={getUsers} confirmedUsers={confirmedUsers} unconfirmedUsers={unconfirmedUsers} waitingUsers={waitingUsers} />)
            else return (<ConnectionBlock status={FriendStatus.Other} isRequests={props.isRequests} setUser={setUser} setIsOpen={setIsOpen} key={user.id + otherUsers.length} user={user} group={props.group} session={props.session}
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