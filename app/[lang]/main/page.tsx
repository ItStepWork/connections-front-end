"use client"

import { getSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import Gallery from "../components/gallery/main/page";
import Menu from "../components/main/menu/page";
import { ConnectionsCard } from '../components/userProfile/connectionsCard/connectionsCard';
import styles from './styles.module.scss';
import { GroupsCard } from "../components/userProfile/groupsCard/groupsCard";
import Celebration from "../components/main/celebrations/page";
import Notifications from "../components/notifications/main/page";
import { ComponentName } from "../../../enums/all.enum";
import Posts from "../components/posts/page";

export default function Home(props: any) {

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
    if (component === ComponentName.Groups) return (<GroupsCard userId={session?.user.id} />)
    else if (component === ComponentName.Celebration) return (<Celebration />)
    else if (component === ComponentName.Connections) return (<ConnectionsCard session={session} myId={session?.user.id} userId={session?.user.id} />)
    else if (component === ComponentName.Gallery) return (<Gallery myId={session?.user.id} userId={session?.user.id} />)
    else if (component === ComponentName.Notifications) return (<Notifications accessToken={session?.user.accessToken} />)
    else if (component === ComponentName.Posts) return (<Posts />)
    else return (<></>)
  }

  return (
    <main>
      <div className={styles.container}>
        <Menu setComponent={setComponent} />
        <div className={styles.containerContent}>
          {session ? ChangeComponent() : <></>}
        </div>
      </div>
    </main>
  )
}
