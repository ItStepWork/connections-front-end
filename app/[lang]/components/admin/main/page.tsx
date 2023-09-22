'use client'
import { getSession } from "next-auth/react";
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

export default function Admin({ local }: { local: any }, props: any) {

  const [users, setUsers] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);
  const [component, setComponent] = useState<AdminComponentName>(AdminComponentName.Users);

  const load = async () => {
    let value = await getSession();
    setSession(value);
  }

  const getUsers =async()=>{
    let result = await AdminService.getUsers();
    setUsers(result);
  }

  useEffect(() => {
    load();
    getUsers();
  }, [])

  const ChangeComponent = () => {
    if (component === AdminComponentName.Users) return (<Users users={users}/>)
    else if (component === AdminComponentName.Genders) return (<Genders users={users}/>)
    else if (component === AdminComponentName.Zodiacs) return (<Zodiacs users={users}/>)
    else if (component === AdminComponentName.PagesActivity) return (<PagesActivity />)
    else if (component === AdminComponentName.UsersActivity) return (<UsersActivity />)
    else if (component === AdminComponentName.Map) return (<Map users={users}/>)
    else if (component === AdminComponentName.AllCharts) return (<AllCharts users={users}/>)
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
