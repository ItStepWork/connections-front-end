'use client'
import { useState } from 'react';
import { BiMessageRoundedError, BiWorld } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import { ImMenu } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { AdminComponentName } from '../../../../../enums/all.enum';
import DropDownMenu from '../dropDownMenu/page';
import LiMenu from '../liMenu/page';
import styles from './styles.module.scss';

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
              <LiMenu name={props.local.admin.sidebar.users} icon={FaUserGroup} component={AdminComponentName.Users} setComponent={props.setComponent} local={props.local}/>
              <LiMenu name={props.local.admin.sidebar.groups} icon={FaUsers} component={AdminComponentName.Groups} setComponent={props.setComponent}/>
              <LiMenu name={props.local.admin.sidebar.messages} icon={HiOutlineMail} component={AdminComponentName.Messages} setComponent={props.setComponent}/>
              <LiMenu name={props.local.admin.sidebar.complaints} icon={BiMessageRoundedError} component={AdminComponentName.Complaints} setComponent={props.setComponent}/>
              <LiMenu name={props.local.admin.sidebar.map} icon={BiWorld} component={AdminComponentName.Map} setComponent={props.setComponent}/>
              <DropDownMenu  setComponent={props.setComponent} local={props.local}/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
