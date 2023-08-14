import { useState } from 'react';
import LeftMessage from '../leftMessage/page'
import RigthMessage from '../rigthMassage/page'
import TopMessage from '../topMessage/page'
import styles from './styles.module.scss'
import { getSession } from 'next-auth/react';
import { IUser } from '@/dto/sessionDto';

export default function MainBlock(props: any) {

  const [user, setUser] = useState<any>(null);

  const getUser = async()=>{
    const session = await getSession();
    setUser(session?.user)
  }

  getUser();
  
  return (
    <>
      <div className={styles.container}>
        {props.messages.map((message: any, index: number)=>{
          if(message.senderId === user?.id) {
            return(<RigthMessage key={index} message={message}/>)
          }
          else {
            return(<LeftMessage key={index} message={message} user={props.user}/>)
          }
        })}
        {/* <TopMessage />
        <LeftMessage />
        <RigthMessage /> */}
      </div>
    </>
  )
}