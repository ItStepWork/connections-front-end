'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Navigation from "../navigation/page";
import { AdminComponentName } from "../../../../../enums/all.enum";
import Users from "../users/page";
import Genders from "../genders/page";
import { AdminService } from "../../../../../services/admin.service";
import Zodiacs from "../zodiacs/page";
import PagesActivity from "../pagesActivity/page";
import UsersActivity from "../usersActivity/page";
import Map from "../map/page";
import AllCharts from "../allCharts/page";
import Groups from '../groups/page';
import Messaging from '../messaging/messaging';

export default function Admin({ local, session }: { local: any, session: any }, props: any) {

  const [users, setUsers] = useState<any[]>([]);
  const [component, setComponent] = useState<AdminComponentName>(AdminComponentName.Users);

  const getUsers =async()=>{
    let result = await AdminService.getUsers();
    setUsers(result);
  }

  useEffect(() => {
    getUsers();
  }, [])

  const ChangeComponent = () => {
    if (component === AdminComponentName.Users) return (<Users users={users} getUsers={getUsers}/>)
    else if (component === AdminComponentName.Groups) return (<Groups/>)
    else if (component === AdminComponentName.Genders) return (<Genders users={users}/>)
    else if (component === AdminComponentName.Zodiacs) return (<Zodiacs users={users}/>)
    else if (component === AdminComponentName.PagesActivity) return (<PagesActivity />)
    else if (component === AdminComponentName.UsersActivity) return (<UsersActivity />)
    else if (component === AdminComponentName.Map) return (<Map users={users}/>)
    else if (component === AdminComponentName.AllCharts) return (<AllCharts users={users}/>)
    else if (component === AdminComponentName.Messages) return (<Messaging/>)
    else return (<></>)
  }

  return (
    <div className={styles.container}>
      <Navigation local={local} component={component}  setComponent={setComponent}/>
      <div className={styles.containerContent}>
        {session ? ChangeComponent() : <></>}
      </div>
    </div>
  )
}
