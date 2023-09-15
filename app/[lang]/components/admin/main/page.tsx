'use client'
import { getSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Navigation from "../navigation/page";
import { AdminComponentName } from "../../../../../enums/all.enum";

export default function Admin({ local }: { local: any }, props: any) {

  const [session, setSession] = useState<any>(null);
  const [component, setComponent] = useState<AdminComponentName>(AdminComponentName.Users);

  const load = async () => {
    let value = await getSession();
    setSession(value);
  }

  useEffect(() => {
    load();
  }, [])

  const ChangeComponent = () => {
    if (component === AdminComponentName.Users) return (<></>)
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
