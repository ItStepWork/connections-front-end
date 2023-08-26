import { useState } from 'react';
import { ConnectionBlock } from './connectionBlock';
import { Window } from '@/components/messaging/window/page';
import styles from './connectionsCard.module.scss';
import { BsFillSendFill } from 'react-icons/bs';
import { MessagingService } from '@/services/messaging.service';

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
  console.log(props.users)
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
        && <Window name={user.firstName} isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className='flex justify-between pt-10 p-3'>
            <textarea className={styles.textarea} rows={7} onChange={(e) => { setMessage(e.target.value) }} value={message}></textarea>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={() => sendMessage(message)}>
                <BsFillSendFill className='fill-white' />
              </button>
            </div>
          </div>
        </Window>
      }
    </>
  )
}