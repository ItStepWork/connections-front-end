'use client'
import DropDownMenu from '../dropDownMenu/page';
import styles from './styles.module.scss';
import { useState } from 'react';
import { ImMenu } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { FaUsers } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import { AdminComponentName } from '../../../../../enums/all.enum';
import LiMenu from '../liMenu/page';

export default function Navigation(props: any) {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.containerMenu}>
      <div className={styles.actionOpen} onClick={() => { setIsOpen(!isOpen) }} >
        <ImMenu size={24} />
        <h2 className="text-xl mx-1">{props.local.main.menu}</h2>
      </div>
      <div className={`z-10 absolute lg:static transition-all duration-500 ease-in ${isOpen ? 'left-[0px]' : 'left-[-400px]'}`}>
        <div className={styles.menu}>
          <IoMdClose className={styles.actionClose} size={24} onClick={() => { setIsOpen(false) }} />
          <div className="mt-2 p-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <LiMenu name="Users" icon={FaUsers} component={AdminComponentName.Users} setComponent={props.setComponent}/>
              <LiMenu name="Map" icon={BiWorld} component={AdminComponentName.Map} setComponent={props.setComponent}/>
              <DropDownMenu  setComponent={props.setComponent}/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
