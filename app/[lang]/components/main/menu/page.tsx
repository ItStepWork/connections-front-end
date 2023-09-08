"use client"
import { useState } from 'react';
import { AiFillCloseSquare } from 'react-icons/ai';
import { ImMenu } from 'react-icons/im';
import { LeftBlockFooter } from "../leftBlockFooter/leftBlockFooter";
import { LeftUserBlock } from "../leftUserBlock/leftUserBlock";
import styles from './styles.module.scss';

export default function Menu(props: any) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.containerMenu}>
      <div className={styles.actionOpen} onClick={() => { setIsOpen(!isOpen) }} >
        <ImMenu size={24}/>
        <h2 className="text-xl mx-1">Меню</h2>
      </div>
      <div className={`z-10 absolute lg:static transition-all duration-500 ease-in ${isOpen ? 'left-[0px]' : 'left-[-400px]'}`}>
        <div className={styles.menu}>
          <AiFillCloseSquare className={styles.actionClose} size={24} onClick={() => { setIsOpen(false) }} />
          <LeftUserBlock setComponent={props.setComponent} setIsOpen={setIsOpen} />
          {/* <LeftBlockFooter /> */}
        </div>
      </div>
    </div>
  )
}
