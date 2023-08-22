import styles from './styles.module.scss';
import { LeftBlockFooter } from "@/components/main/leftBlockFooter/leftBlockFooter";
import { LeftUserBlock } from "@/components/main/leftUserBlock/leftUserBlock";
import { useState } from 'react';
import { ImMenu } from 'react-icons/im';
import { AiFillCloseSquare } from 'react-icons/ai'

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
          <LeftUserBlock setComponent={props.setComponent} />
          <LeftBlockFooter />
        </div>
      </div>
    </div>
  )
}
