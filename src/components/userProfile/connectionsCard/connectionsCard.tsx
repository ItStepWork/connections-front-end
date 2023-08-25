import { ConnectionsPreloader } from '@/loaders/connectionsPreloader';
import { useEffect, useState } from 'react';
import { ConnectionBlock } from './connectionBlock';
import styles from './connectionsCard.module.scss';
import { FriendService } from '@/services/friend.service';

export const ConnectionsCard = (props: any) => {

  const [loading, setLoading] = useState(true);
  const [confirmedUsers, setConfirmedUsers] = useState<any[]>([]);
  const [unconfirmedUsers, setUnconfirmedUsers] = useState<any[]>([]);
  const [waitingUsers, setWaitingUsers] = useState<any[]>([]);
  const [otherUsers, setOtherUsers] = useState<any[]>([]);
  const [count, setCount] = useState<number>(5);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let result1 = await FriendService.getConfirmedFriends(props.userId);
    setConfirmedUsers(result1);
    let result2 = await FriendService.getUnconfirmedFriends(props.userId);
    setUnconfirmedUsers(result2);
    let result3 = await FriendService.getWaitingFriends(props.userId);
    setWaitingUsers(result3);
    let result4 = await FriendService.getOtherUsers(props.userId);
    setOtherUsers(result4);
    setLoading(false);
  }

  const loadMore = () => {
    setCount(count + 5);
  }

  if (loading) {
    return <ConnectionsPreloader />;
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Связи</h2>
        {unconfirmedUsers.map((user: any, index: number) => {
          if (index < count) return <ConnectionBlock key={user.id} user={user} status="unconfirmed" getUsers={getUsers} />
        })}
        {waitingUsers.map((user: any, index: number) => {
          if ((index + unconfirmedUsers.length) < count) return <ConnectionBlock key={user.id} user={user} status="waiting" getUsers={getUsers} />
        })}
        {confirmedUsers.map((user: any, index: number) => {
          if ((index + unconfirmedUsers.length + waitingUsers.length) < count) return <ConnectionBlock key={user.id} user={user} status="confirmed" getUsers={getUsers} />
        })}
        {otherUsers.map((user: any, index: number) => {
          if ((index + unconfirmedUsers.length + waitingUsers.length + confirmedUsers.length) < count) return <ConnectionBlock key={user.id} user={user} status="other" getUsers={getUsers} />
        })}
        <button className={styles.buttonLoadMore} onClick={loadMore}>Загрузть еще</button>
      </div >
    </>
  )
}