"use client"

import styles from './styles.module.scss';
import LeftMessage from '../leftMessage/page';
import RightMessage from '../rightMassage/page';

export default function MainBlock(props: any) {

  const {
    messages,
    user
  } = props;

  return (
    <div className='m-2 h-0 flex-grow overflow-y-auto'>
      <div className={styles.container}>
        {messages.map((message: any, index: number) => {
          if (message.senderId === user?.id) {
            return (<RightMessage key={index} message={message}/>)
          }
          else {
            return (<LeftMessage key={index} message={message} user={user}/>)
          }
        })}
      </div>
    </div>

  )
}