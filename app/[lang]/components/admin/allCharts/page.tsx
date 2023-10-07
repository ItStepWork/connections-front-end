'use client'

import Genders from '../genders/page';
import PagesActivity from '../pagesActivity/page';
import UsersActivity from '../usersActivity/page';
import Zodiacs from '../zodiacs/page';
import styles from './styles.module.scss';
export default function AllCharts(props: any) {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Genders users={props.users} local={props.local}/>
      </div>
      <div className={styles.content}>
        <Zodiacs users={props.users} local={props.local}/>
      </div>
      <div className={styles.content}>
        <UsersActivity local={props.local}/>
      </div>
      <div className={styles.content}>
        <PagesActivity local={props.local}/>
      </div>
    </div>
  )
}
