"use client"

import { FaUserCircle } from 'react-icons/fa';
import OnlineUser from '../../onlineUser/page';
import DropDownItem from '../dropDownItem/page';
import styles from './styles.module.scss';

export default function HeaderBlock(props: any) {

  const {
    user, 
    removeDialog, 
    local 
  } = props;

  return (
    <>
      <div>
        <div className={styles.container}>
          <div className={styles.user}>
            {user.avatarUrl?(<img className={styles.userImage} src={user.avatarUrl}/>):(<FaUserCircle className={styles.userImage} />)}
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.lastName} {user.firstName}</span>
              <div className='text-sm'>
                <OnlineUser user={user} local={local}/>
              </div>
            </div>
          </div>
          <DropDownItem 
            removeDialog={removeDialog} 
            id={user.id} 
            local={local}/>
        </div>
        <hr className={styles.hr} />
      </div>
    </>
  )
}