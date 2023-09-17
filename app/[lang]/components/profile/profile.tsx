"use client"
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ComponentName } from '../../../../enums/all.enum';
import Gallery from '../gallery/main/page';
import { AboutCard } from '../userProfile/aboutCard/aboutCard';
import { ConnectionsCard } from '../userProfile/connectionsCard/connectionsCard';
import { FriendsCard } from '../userProfile/friendsCard/friendsCard';
import { GroupsCard } from '../userProfile/groupsCard/groupsCard';
import PhotosCard from '../userProfile/photosCard/photosCard';
import { ProfileInfo } from '../userProfile/profileInfo/profileInfo';
import { UserCard } from '../userProfile/userCard/userCard';
import styles from './profile.module.scss';

export default function Profile(props: any) {
  const [component, setComponent] = useState<ComponentName>(ComponentName.Connections);
  const [session, setSession] = useState<any>(null);
  const load = async () => {
    const result = await getSession();
    setSession(result);
  }

  useEffect(() => {
    load();
  }, []);

  const changeComponent = () => {
    if (component === ComponentName.AboutMe) return (<ProfileInfo local={props.local} />)
    else if (component === ComponentName.Groups) return (<GroupsCard session={session} userId={props.id[0]} local={props.local} />)
    else if (component === ComponentName.Connections) return (<ConnectionsCard session={session} myId={session?.user.id} userId={props.id[0]} local={props.local} />)
    else if (component === ComponentName.Gallery) return (<Gallery myId={session?.user.id} userId={props.id[0]} local={props.local} />)
    else return (<></>)
  }
  return (
    <>
      <main>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <UserCard setComponent={setComponent} component={component} myId={session?.user.id} userId={props.id[0]} local={props.local} />
            {session ? changeComponent() : <></>}
          </div>
          {/* <div className={styles.rightContainer}>

            <AboutCard />
            <PhotosCard />
            <FriendsCard />

          </div> */}
        </div>
      </main>
    </>
  )
}