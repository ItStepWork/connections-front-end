'use client'

import Genders from '../genders/page';
import Zodiacs from '../zodiacs/page';
import UsersActivity from '../usersActivity/page';
import PagesActivity from '../pagesActivity/page';
import styles from './styles.module.scss';
export default function AllCharts(props: any) {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Genders users={props.users} />
      </div>
      <div className={styles.content}>
        <Zodiacs users={props.users} />
      </div>
      <div className={styles.content}>
        <UsersActivity />
      </div>
      <div className={styles.content}>
        <PagesActivity />
      </div>
    </div>
  )
}
