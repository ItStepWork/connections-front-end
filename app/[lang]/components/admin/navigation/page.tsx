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

  const {
    local,
    setComponent
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.containerMenu}>
      <div className={styles.actionOpen} onClick={() => { setIsOpen(!isOpen) }} >
        <ImMenu size={24} />
        <h2 className="text-xl mx-1">{local.main.menu}</h2>
      </div>
      <div className={`z-10 absolute lg:static transition-all duration-500 ease-in ${isOpen ? 'left-[0px]' : 'left-[-400px]'}`}>
        <div className={styles.menu}>
          <IoMdClose className={styles.actionClose} size={24} onClick={() => { setIsOpen(false) }} />
          <div className="mt-2 p-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <LiMenu name={local.admin.sidebar.users} icon={FaUserGroup} component={AdminComponentName.Users} setComponent={setComponent} local={local}/>
              <LiMenu name={local.admin.sidebar.groups} icon={FaUsers} component={AdminComponentName.Groups} setComponent={setComponent}/>
              <LiMenu name={local.admin.sidebar.messages} icon={HiOutlineMail} component={AdminComponentName.Messages} setComponent={setComponent}/>
              <LiMenu name={local.admin.sidebar.complaints} icon={BiMessageRoundedError} component={AdminComponentName.Complaints} setComponent={setComponent}/>
              <LiMenu name={local.admin.sidebar.map} icon={BiWorld} component={AdminComponentName.Map} setComponent={setComponent}/>
              <DropDownMenu  setComponent={setComponent} local={local}/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
