"use client"

import { useState } from 'react';
import { ComponentName } from "../../../../../enums/all.enum";
import Gallery from "../../gallery/main/page";
import Notifications from "../../notifications/page";
import Posts from "../../posts/page";
import { ConnectionsCard } from "../../userProfile/connectionsCard/connectionsCard";
import { GroupsCard } from "../../userProfile/groupsCard/groupsCard";
import Celebration from "../celebrations/page";
import Menu from "../menu/page";
import styles from './main.module.scss';

export default function Main({ local, session }: { local: any, session: any }, props: any) {

  const [component, setComponent] = useState<ComponentName>(ComponentName.Posts);

  const ChangeComponent = () => {
    if (component === ComponentName.Groups) return (<GroupsCard session={session} userId={session.user.id} local={local} />)
    else if (component === ComponentName.Celebration) return (<Celebration user={session.user} local={local} />)
    else if (component === ComponentName.Connections) return (<ConnectionsCard session={session} myId={session.user.id} userId={session.user.id} local={local} />)
    else if (component === ComponentName.Gallery) return (<Gallery session={session} myId={session.user.id} userId={session.user.id} local={local} />)
    else if (component === ComponentName.Notifications) return (<Notifications session={session} local={local} />)
    else if (component === ComponentName.Posts) return (<Posts local={local} session={session} myId={session.user.id} userId={session.user.id} />)
    else return (<></>)
  }

  return (
    <>
      {session &&
        <div className={styles.container}>
          <Menu setComponent={setComponent} local={local} session={session} myId={session.user.id} userId={session.user.id} />
          <div className={styles.containerContent}>
            {ChangeComponent()}
          </div>
        </div>}
    </>
  )
}
