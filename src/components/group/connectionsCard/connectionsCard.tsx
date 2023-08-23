import { useState } from 'react';
import { ConnectionBlock } from './connectionBlock';
import styles from './connectionsCard.module.scss';

export const ConnectionsCard = (props: any) => {
  const [count, setCount] = useState(1)
  let IfAdmin = () => {
    if (props.group.adminId === props.session?.user?.id) return true;
    else return false;
  };
  return (
    <>
      <div className={styles.container}>
        <h2>Связи</h2>
        {props.users.map((user: any, index: any) => {
          if (index <= count) {
            if (!(IfAdmin() && user.id === props.session?.user?.id))
              return (<ConnectionBlock key={index} user={user} group={props.group} session={props.session} GetGroup={props.getGroup} GetUsers={props.GetUsers} />)
          }
        })}
        <button className={styles.buttonLoadMore} onClick={() => setCount(count + 1)}>Загрузить еще</button>
      </div >
    </>
  )
}