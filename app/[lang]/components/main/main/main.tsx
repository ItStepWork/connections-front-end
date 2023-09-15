"use client"

import { getSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { ComponentName } from "../../../../../enums/all.enum";
import Gallery from "../../gallery/main/page";
import Notifications from "../../notifications/page";
import Posts from "../../posts/page";
import { ConnectionsCard } from "../../userProfile/connectionsCard/connectionsCard";
import { GroupsCard } from "../../userProfile/groupsCard/groupsCard";
import Celebration from "../celebrations/page";
import Menu from "../menu/page";
import styles from './main.module.scss';


export default function Main({ local }: { local: any }, props: any) {

  const [session, setSession] = useState<any>(null);
  const [component, setComponent] = useState<ComponentName>(ComponentName.Posts);

  const load = async () => {
    let value = await getSession();
    setSession(value);
  }

  useEffect(() => {
    load();
  }, [])

  const ChangeComponent = () => {
    if (component === ComponentName.Groups) return (<GroupsCard session={session} userId={session?.user.id} local={local} />)
    else if (component === ComponentName.Celebration) return (<Celebration local={local} />)
    else if (component === ComponentName.Connections) return (<ConnectionsCard session={session} myId={session?.user.id} userId={session?.user.id} local={local} />)
    else if (component === ComponentName.Gallery) return (<Gallery myId={session?.user.id} userId={session?.user.id} local={local} />)
    else if (component === ComponentName.Notifications) return (<Notifications accessToken={session?.user.accessToken} local={local} />)
    else if (component === ComponentName.Posts) return (<Posts local={local} />)
    else return (<></>)
  }

  return (
    <div className={styles.container}>
      <Menu setComponent={setComponent} local={local} />
      <div className={styles.containerContent}>
        {session ? ChangeComponent() : <></>}
      </div>
    </div>
  )
}
