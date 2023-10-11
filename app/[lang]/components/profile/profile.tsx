"use client"
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ComponentName } from '../../../../enums/all.enum';
import { FriendService } from '../../../../services/friend.service';
import Gallery from '../gallery/main/page';
import Posts from '../posts/page';
import { ConnectionsCard } from '../userProfile/connectionsCard/connectionsCard';
import { GroupsCard } from '../userProfile/groupsCard/groupsCard';
import { ProfileInfo } from '../userProfile/profileInfo/profileInfo';
import { UserCard } from '../userProfile/userCard/userCard';
import styles from './profile.module.scss';

export default function Profile(props: any) {

  const {
    id,
    lang,
    local
  } = props;

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
    let result = await FriendService.getFriend(id);
    setUser(result);
  }

  const changeComponent = () => {
    if (component === ComponentName.AboutMe) return (user && <ProfileInfo local={local} user={user} />)
    else if (component === ComponentName.Groups) return (<GroupsCard session={session} userId={id[0]} local={local} lang={lang}/>)
    else if (component === ComponentName.Connections) return (<ConnectionsCard session={session} myId={session?.user.id} userId={id[0]} local={local} />)
    else if (component === ComponentName.Gallery) return (<Gallery session={session} myId={session?.user.id} userId={id[0]} local={local} />)
    else if (component === ComponentName.Posts) return (<Posts local={local} session={session} myId={session.user.id} userId={id[0]} />)
    else return (<></>)
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          {session && user 
            ? <UserCard 
                user={user} 
                getUser={getUser} 
                setComponent={setComponent} 
                component={component} 
                session={session} 
                lang={lang} 
                local={local} /> 
            : <></>
          }
          {session ? changeComponent() : <></>}
        </div>
      </div>
    </>
  )
}