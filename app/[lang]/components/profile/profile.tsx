"use client"
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ComponentName } from '../../../../enums/all.enum';
import Gallery from '../gallery/main/page';
import Posts from '../posts/page';
import { ConnectionsCard } from '../userProfile/connectionsCard/connectionsCard';
import { GroupsCard } from '../userProfile/groupsCard/groupsCard';
import { ProfileInfo } from '../userProfile/profileInfo/profileInfo';
import { UserCard } from '../userProfile/userCard/userCard';
import styles from './profile.module.scss';
import { FriendService } from '../../../../services/friend.service';

export default function Profile(props: any) {
  const [component, setComponent] = useState<ComponentName>(ComponentName.AboutMe);
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const load = async () => {
    const result = await getSession();
    setSession(result);
  }
  useEffect(() => {
    getUser();
    load();

  }, []);
  const getUser = async () => {
    let result = await FriendService.getFriend(props.id);
    setUser(result);
    // setLoading(false);
  }

  const changeComponent = () => {
    if (component === ComponentName.AboutMe) return (user && <ProfileInfo local={props.local} user={user} />)
    else if (component === ComponentName.Groups) return (<GroupsCard session={session} userId={props.id[0]} local={props.local} />)
    else if (component === ComponentName.Connections) return (<ConnectionsCard session={session} myId={session?.user.id} userId={props.id[0]} local={props.local} />)
    else if (component === ComponentName.Gallery) return (<Gallery session={session} myId={session?.user.id} userId={props.id[0]} local={props.local} />)
    else if (component === ComponentName.Posts) return (<Posts local={props.local} session={session} myId={session.user.id} userId={props.id[0]} />)
    else return (<></>)
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          {session && user ? <UserCard user={user} getUser={getUser} setComponent={setComponent} component={component} session={session} lang={props.lang} local={props.local} /> : <></>}
          {session ? changeComponent() : <></>}
        </div>
      </div>
    </>
  )
}