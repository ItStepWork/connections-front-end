import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FriendStatus } from '../../../../../enums/all.enum';
import { FriendService } from '../../../../../services/friend.service';
import FooterBlock from '../../messaging/footerBlock/page';
import { Window } from '../../messaging/window/page';
import { ConnectionBlock } from './connectionBlock';
import styles from './connectionsCard.module.scss';

export const ConnectionsCard = (props: any) => {

  const [confirmedUsers, setConfirmedUsers] = useState<any[]>([]);
  const [unconfirmedUsers, setUnconfirmedUsers] = useState<any[]>([]);
  const [waitingUsers, setWaitingUsers] = useState<any[]>([]);
  const [otherUsers, setOtherUsers] = useState<any[]>([]);
  const [confirmedUsersFilter, setConfirmedUsersFilter] = useState<any[]>([]);
  const [unconfirmedUsersFilter, setUnconfirmedUsersFilter] = useState<any[]>([]);
  const [waitingUsersFilter, setWaitingUsersFilter] = useState<any[]>([]);
  const [otherUsersFilter, setOtherUsersFilter] = useState<any[]>([]);
  const [count, setCount] = useState<number>(5);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const changeSearch = (event: any) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setConfirmedUsersFilter(confirmedUsers);
      setUnconfirmedUsersFilter(unconfirmedUsers);
      setWaitingUsersFilter(waitingUsers);
      setOtherUsersFilter(otherUsers);
    }
    else {
      let search = event.target.value.toLowerCase();
      let confirmedUsersResult = confirmedUsers.filter((u: any) => u.firstName?.toLowerCase().includes(search) || u.lastName?.toLowerCase().includes(search) || u.email?.toLowerCase().includes(search) || u.phone?.toLowerCase().includes(search) || (u.firstName?.toLowerCase() + " " + u.lastName?.toLowerCase()).includes(search) || (u.lastName?.toLowerCase() + " " + u.firstName?.toLowerCase()).includes(search));
      setConfirmedUsersFilter(confirmedUsersResult);
      let unconfirmedUsersResult = unconfirmedUsers.filter((u: any) => u.firstName?.toLowerCase().includes(search) || u.lastName?.toLowerCase().includes(search) || u.email?.toLowerCase().includes(search) || u.phone?.toLowerCase().includes(search) || (u.firstName?.toLowerCase() + " " + u.lastName?.toLowerCase()).includes(search) || (u.lastName?.toLowerCase() + " " + u.firstName?.toLowerCase()).includes(search));
      setUnconfirmedUsersFilter(unconfirmedUsersResult);
      let waitingUsersResult = waitingUsers.filter((u: any) => u.firstName?.toLowerCase().includes(search) || u.lastName?.toLowerCase().includes(search) || u.email?.toLowerCase().includes(search) || u.phone?.toLowerCase().includes(search) || (u.firstName?.toLowerCase() + " " + u.lastName?.toLowerCase()).includes(search) || (u.lastName?.toLowerCase() + " " + u.firstName?.toLowerCase()).includes(search));
      setWaitingUsersFilter(waitingUsersResult);
      let otherUsersResult = otherUsers.filter((u: any) => u.firstName?.toLowerCase().includes(search) || u.lastName?.toLowerCase().includes(search) || u.email?.toLowerCase().includes(search) || u.phone?.toLowerCase().includes(search) || (u.firstName?.toLowerCase() + " " + u.lastName?.toLowerCase()).includes(search) || (u.lastName?.toLowerCase() + " " + u.firstName?.toLowerCase()).includes(search));
      setOtherUsersFilter(otherUsersResult);
    }
  }

  const getUsers = async () => {
    let result1 = await FriendService.getConfirmedFriends(props.userId);
    setConfirmedUsers(result1);
    setConfirmedUsersFilter(result1);
    let result2 = await FriendService.getUnconfirmedFriends(props.userId);
    setUnconfirmedUsers(result2);
    setUnconfirmedUsersFilter(result2);
    let result3 = await FriendService.getWaitingFriends(props.userId);
    setWaitingUsers(result3);
    setWaitingUsersFilter(result3);
    let result4 = await FriendService.getOtherUsers(props.userId);
    setOtherUsers(result4);
    setOtherUsersFilter(result4);
  }

  const loadMore = () => {
    setCount(count + 5);
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Связи</h2>
        <div className="flex my-3">
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder="Введите имя, фамилию или емейл" onChange={(e) => { changeSearch(e) }} value={search} />
        </div>
        {unconfirmedUsersFilter.map((user: any, index: number) => {
          if (index < count) return <ConnectionBlock key={user.id} myId={props.myId} user={user} status={FriendStatus.Unconfirmed} getUsers={getUsers} setSelectedUser={setSelectedUser} setIsOpen={setIsOpen} />
        })}
        {waitingUsersFilter.map((user: any, index: number) => {
          if ((index + unconfirmedUsersFilter.length) < count) return <ConnectionBlock key={user.id} myId={props.myId} user={user} status={FriendStatus.Waiting} getUsers={getUsers} setSelectedUser={setSelectedUser} setIsOpen={setIsOpen} />
        })}
        {confirmedUsersFilter.map((user: any, index: number) => {
          if ((index + unconfirmedUsersFilter.length + waitingUsersFilter.length) < count) return <ConnectionBlock key={user.id} myId={props.myId} user={user} status={FriendStatus.Confirmed} getUsers={getUsers} setSelectedUser={setSelectedUser} setIsOpen={setIsOpen} />
        })}
        {otherUsersFilter.map((user: any, index: number) => {
          if ((index + unconfirmedUsersFilter.length + waitingUsersFilter.length + confirmedUsersFilter.length) < count) return <ConnectionBlock key={user.id} myId={props.myId} user={user} status={FriendStatus.Other} getUsers={getUsers} setSelectedUser={setSelectedUser} setIsOpen={setIsOpen} />
        })}
        <button className={styles.buttonLoadMore} onClick={loadMore}>Загрузить еще</button>
      </div >
      {selectedUser &&
        <Window name={selectedUser.firstName + " " + selectedUser.lastName} isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className='flex h-5/6 justify-center items-end'>
            <FooterBlock friendId={selectedUser.id} />
          </div>
        </Window>
      }
    </>
  )
}