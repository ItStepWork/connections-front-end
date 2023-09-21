'use client'
import { getSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Navigation from "../navigation/page";
import { AdminComponentName } from "../../../../../enums/all.enum";
import Users from "../users/page";
import ChartGenders from "../chartGenders/page";
import { AdminService } from "../../../../../services/admin.service";
import ChartZodiacs from "../chartZodiacs/page";
import DailyPagesActivityChart from "../dailyPagesActivityChart/page";
import DailyActivityChart from "../dailyActivityChart/page";
import Map from "../map/page";

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
    else if (component === AdminComponentName.ChartGenders) return (<ChartGenders users={users}/>)
    else if (component === AdminComponentName.ChartZodiacs) return (<ChartZodiacs users={users}/>)
    else if (component === AdminComponentName.DailyPagesActivityChart) return (<DailyPagesActivityChart />)
    else if (component === AdminComponentName.DailyActivityChart) return (<DailyActivityChart />)
    else if (component === AdminComponentName.Map) return (<Map users={users}/>)
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
