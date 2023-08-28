import { useState, useEffect } from 'react';
import LeftMessage from '../leftMessage/page'
import RigthMessage from '../rigthMassage/page'
import TopMessage from '../topMessage/page'
import styles from './styles.module.scss'
import { getSession } from 'next-auth/react';

export default function MainBlock(props: any) {

  const [user, setUser] = useState<any>(null);

  const getUser = async()=>{
    const session = await getSession();
    setUser(session?.user)
  }

  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <>
      <div className={styles.container}>
        {props.messages.map((message: any, index: number)=>{
          if(message.senderId === user?.id) {
            return(<RigthMessage key={index} message={message} user={props.user} loadMessages={props.loadMessages} loadDialogs={props.loadDialogs} />)
          }
          else {
            return(<LeftMessage key={index} message={message} user={props.user} loadMessages={props.loadMessages} loadDialogs={props.loadDialogs} />)
          }
        })}
        {/* <TopMessage />
        <LeftMessage />
        <RigthMessage /> */}
      </div>
    </>
  )
}