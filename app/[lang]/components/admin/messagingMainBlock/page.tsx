"use client"
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import LeftMessage from '../../support/leftMessage/page';
import RightMessage from '../../support/rightMassage/page';

export default function MessagingMainBlock(props: any) {

  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    const session = await getSession();
    setUser(session?.user)
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='m-2 overflow-y-auto'>
      <div className={styles.container}>
        {props.messages.map((message: any, index: number) => {
          if (message.senderId === user?.id) {
            return (<RightMessage key={index} message={message} user={props.user}/>)
          }
          else {
            return (<LeftMessage key={index} message={message} user={props.user}/>)
          }
        })}
      </div>
    </div>

  )
}