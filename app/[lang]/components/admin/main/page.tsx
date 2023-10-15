'use client'

import { useEffect, useState } from 'react';
import { AdminComponentName } from "../../../../../enums/all.enum";
import { AdminService } from "../../../../../services/admin.service";
import AllCharts from "../allCharts/page";
import Complaints from '../complaints/page';
import Genders from "../genders/page";
import Groups from '../groups/page';
import Map from "../map/page";
import Messaging from '../messaging/messaging';
import Navigation from "../navigation/page";
import PagesActivity from "../pagesActivity/page";
import Users from "../users/page";
import UsersActivity from "../usersActivity/page";
import Zodiacs from "../zodiacs/page";
import styles from './styles.module.scss';

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
    if (component === AdminComponentName.Users) return (<Users users={users} getUsers={getUsers} local={local}/>)
    else if (component === AdminComponentName.Groups) return (<Groups local={local}/>)
    else if (component === AdminComponentName.Genders) return (<Genders users={users} local={local}/>)
    else if (component === AdminComponentName.Zodiacs) return (<Zodiacs users={users} local={local}/>)
    else if (component === AdminComponentName.PagesActivity) return (<PagesActivity local={local}/>)
    else if (component === AdminComponentName.UsersActivity) return (<UsersActivity local={local}/>)
    else if (component === AdminComponentName.Map) return (<Map allUsers={users} getUsers={getUsers} local={local}/>)
    else if (component === AdminComponentName.AllCharts) return (<AllCharts users={users} local={local}/>)
    else if (component === AdminComponentName.Messages) return (<Messaging local={local}/>)
    else if (component === AdminComponentName.Complaints) return (<Complaints local={local}/>)
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
