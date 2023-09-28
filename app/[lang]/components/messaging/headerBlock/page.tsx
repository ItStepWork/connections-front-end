"use client"

import { FaUserCircle } from 'react-icons/fa';
import OnlineUser from '../../onlineUser/page';
import DropDownItem from '../dropDownItem/page';
import styles from './styles.module.scss';

export default function HeaderBlock(props: any) {
  return (
    <>
      <div>
        <div className={styles.container}>
          <div className={styles.user}>
            {props.user.avatarUrl?(<img className={styles.userImage} src={props.user.avatarUrl}/>):(<FaUserCircle className={styles.userImage} />)}
            <div className={styles.userInfo}>
              <span className={styles.userName}>{props.user.lastName} {props.user.firstName}</span>
              <div className='text-sm'>
                <OnlineUser user={props.user} local={props.local}/>
              </div>
            </div>
          </div>
          <DropDownItem removeDialog={props.removeDialog} id={props.user.id} />
        </div>
        <hr className={styles.hr} />
      </div>
    </>
  )
}