"use client"
import { getSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import LeftMessage from '../leftMessage/page';
import RightMessage from '../rightMassage/page';
import styles from './styles.module.scss';

export default function MainBlock(props: any) {

  const ref = useRef<any>(null);
  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    const session = await getSession();
    setUser(session?.user);
  }

  const scrollToLast = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  };

  useEffect(() => {
    getUser();
    scrollToLast();
  }, [props.messages]);

  return (
    <div className='m-2 h-0 flex-grow overflow-y-auto'>
      <div className={styles.container}>
        {props.messages.map((message: any, index: number) => {
          if (message.senderId === user?.id) {
            return (<RightMessage key={index} message={message} user={props.user} />)
          }
          else return (<LeftMessage key={index} message={message} user={props.user} />);
        })}
      </div>
      <div ref={ref} />
    </div>

  )
}