import { useState } from 'react';
import { ConnectionBlock } from './connectionBlock';
import { Window } from '@/components/messaging/window/page';
import styles from './connectionsCard.module.scss';
import { BsFillSendFill } from 'react-icons/bs';
import { MessagingService } from '@/services/messaging.service';
import FooterBlock from '@/components/messaging/footerBlock/page';

export const ConnectionsCard = (props: any) => {
  const [count, setCount] = useState(3)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null)
  const sendMessage = async (mess: string) => {
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("text", mess);
    await MessagingService.sendMessage(formData);
    setMessage("");
  }
  return (
    <>
      <div className={styles.container}>
        {props.users.map((user: any, index: any) => {
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