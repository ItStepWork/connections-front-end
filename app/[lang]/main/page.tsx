"use client"

import { useSession } from "next-auth/react";
import { useState } from 'react';
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

  const { data: session } = useSession();
  const [component, setComponent] = useState<ComponentName>(ComponentName.Posts);

  const ChangeComponent = () => {
    if (component === ComponentName.Groups) return (<GroupsCard userId={session?.user.id} />)
    else if (component === ComponentName.Celebration) return (<Celebration />)
    else if (component === ComponentName.Connections) return (<ConnectionsCard myId={session?.user.id} userId={session?.user.id} />)
    else if (component === ComponentName.Gallery) return (<Gallery myId={session?.user.id} userId={session?.user.id} />)
    else if (component === ComponentName.Notifications) return (<Notifications />)
    else if (component === ComponentName.Posts) return (<Posts />)
    else return (<></>)
  }

  return (
    <main>
      <div className={styles.container}>
        <Menu setComponent={setComponent} />
        <div className={styles.containerContent}>
          {ChangeComponent()}
        </div>
      </div>
    </main>
  )
}
