"use client"
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import LeftMessage from '../leftMessage/page';
import RigthMessage from '../rigthMassage/page';
import styles from './styles.module.scss';

export default function MainBlock(props: any) {

  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    const session = await getSession();
    setUser(session?.user)
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='m-2 h-0 flex-grow overflow-y-auto'>
      <div className={styles.container}>
        {props.messages.map((message: any, index: number) => {
          if (message.senderId === user?.id) {
            return (<RigthMessage key={index} message={message} user={props.user}/>)
          }
          else {
            return (<LeftMessage key={index} message={message} user={props.user}/>)
          }
        })}
        {/* <TopMessage />
        <LeftMessage />
        <RigthMessage /> */}
      </div>
    </div>

  )
}