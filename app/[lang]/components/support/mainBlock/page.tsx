"use client"

import styles from './styles.module.scss';
import RigthMessage from '../rigthMassage/page';
import LeftMessage from '../leftMessage/page';

export default function MainBlock(props: any) {

  return (
    <div className='m-2 h-0 flex-grow overflow-y-auto'>
      <div className={styles.container}>
        {props.messages.map((message: any, index: number) => {
          if (message.senderId === props.user?.id) {
            return (<RigthMessage key={index} message={message}/>)
          }
          else {
            return (<LeftMessage key={index} message={message} user={props.user}/>)
          }
        })}
      </div>
    </div>

  )
}