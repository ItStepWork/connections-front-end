import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FriendService } from '../../../../../services/friend.service';
import FooterBlock from '../../messaging/footerBlock/page';
import Window from '../../messaging/window/page';
import { ConnectionBlock } from './connectionBlock';
import styles from './connectionsCard.module.scss';

export const ConnectionsCard = (props: any) => {

  const [friends, setFriends] = useState<any[]>([]);
  const [friendsFilter, setFriendsFilter] = useState<any[]>([]);
  const [count, setCount] = useState<number>(5);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
    let socket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToFriendsUpdates`, ["client", props.session.user.accessToken]);
    socket.addEventListener('message', (event) => {
      getUsers();
    });
    let intervalId = setInterval(() => {
      if (socket.OPEN) socket.send("ping");
      else clearInterval(intervalId);
    }, 30000);
    return () => {
      setInterval(() => { if (socket.OPEN) socket.close(); }, 1000)
      clearInterval(intervalId);
    };
  }, []);

  const changeSearch = (event: any) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setFriendsFilter(friends);
    }
    else {
      let search = event.target.value.toLowerCase();
      let friendsResult = friends.filter((u: any) => u.firstName?.toLowerCase().includes(search) || u.lastName?.toLowerCase().includes(search) || u.email?.toLowerCase().includes(search) || u.phone?.toLowerCase().includes(search) || (u.firstName?.toLowerCase() + " " + u.lastName?.toLowerCase()).includes(search) || (u.lastName?.toLowerCase() + " " + u.firstName?.toLowerCase()).includes(search));
      setFriendsFilter(friendsResult);
    }
  }

  const getUsers = async () => {
    let result = await FriendService.getFriends(props.userId);
    setFriends(result);
    setFriendsFilter(result);
  }

  const loadMore = () => {
    setCount(count + 5);
  }

  return (
    <>
      <div className={styles.container}>
        <h2>{props.local.profile.connect.title}</h2>
        <div className={styles.inputContainer}>
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder={props.local.search.searchNameOrEmail} onChange={(e) => { changeSearch(e) }} value={search} />
        </div>
        {friendsFilter && friendsFilter.map((user: any, index: number) => {
          if (index < count) return <ConnectionBlock key={user.id} myId={props.myId} user={user} setSelectedUser={setSelectedUser} setIsOpen={setIsOpen} local={props.local} />
        })}
        {friendsFilter.length > count && <button className={styles.buttonLoadMore} onClick={loadMore}>{props.local.button.uploadMore}</button>}
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