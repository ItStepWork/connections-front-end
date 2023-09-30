"use client"
import { getSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import LeftMessage from '../leftMessage/page';
import RightMessage from '../rightMassage/page';
import styles from './styles.module.scss';
import TopMessage from '../topMessage/page';
import { MessageStatus } from '../../../../../enums/all.enum';

export default function MainBlock(props: any) {

  const ref = useRef<any>(null);
  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    const session = await getSession();
    setUser(session?.user);
  }

  const scrollToLast = () => {
    ref.current?.scrollIntoView(false);
  };

  useEffect(() => {
    getUser();
    scrollToLast();
  }, [props.messages]);

  let oldDate = "";
  let check = false;

  const renderScrollTo =()=>{
    if(!check){
      check = true;
      return <div key="scrollTo" ref={ref} />
    }
    else return <></>;
  }

  return (
    <div className='m-2 h-0 flex-grow overflow-y-auto'>
      <div className={styles.container}>
        {props.messages.map((message: any, index: number) => {
          let date = new Date(message.createTime);
          let newDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
          if (newDate !== oldDate) {
            oldDate = newDate;
            if (message.senderId === user?.id) return (<div key={message.senderId + index}><TopMessage date={date.toLocaleDateString()} /><RightMessage message={message} user={props.user} /></div>);
            else return (<div key={message.senderId + index}><TopMessage date={date.toLocaleDateString()} />{message.status === MessageStatus.Unread && renderScrollTo()}<LeftMessage message={message} user={props.user} /></div>);
          }
          else {
            if (message.senderId === user?.id) return (<div key={message.senderId + index}><RightMessage message={message} user={props.user} /></div>);
            else return (<div key={message.senderId + index}>{message.status === MessageStatus.Unread && renderScrollTo()}<LeftMessage message={message} user={props.user} /></div>);
          }
        })}
      </div>
      {renderScrollTo()}
    </div>

  )
}