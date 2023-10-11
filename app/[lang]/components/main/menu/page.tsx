"use client"
import { useState } from 'react';
import { AiFillCloseSquare } from 'react-icons/ai';
import { ImMenu } from 'react-icons/im';
import { LeftUserBlock } from "../leftUserBlock/leftUserBlock";
import styles from './styles.module.scss';
import { FollowsBlock } from '../follows/followsBlock';

export default function Menu(props: any) {

  const {
    setComponent,
    local,
    session,
    myId,
    userId,
    lang
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.containerMenu}>
      <div className={styles.actionOpen} onClick={() => { setIsOpen(!isOpen) }} >
        <ImMenu size={24}/>
        <h2 className="text-xl mx-1">{local.main.menu}</h2>
      </div>
      <div className={`z-10 absolute lg:static transition-all duration-500 ease-in ${isOpen ? 'left-[0px]' : 'left-[-400px]'}`}>
        <div className={styles.menu}>
          <AiFillCloseSquare className={styles.actionClose} size={24} onClick={() => { setIsOpen(false) }} />
          <LeftUserBlock 
            session={session} 
            setComponent={setComponent} 
            setIsOpen={setIsOpen} 
            myId={myId} 
            userId={userId} 
            local={local}
            lang={lang}/>
          <FollowsBlock local={local}/>
        </div>
      </div>
    </div>
  )
}
