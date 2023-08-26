"use client"
import { AboutCard } from '@/components/userProfile/aboutCard/aboutCard';
import { ConnectionsCard } from '@/components/userProfile/connectionsCard/connectionsCard';
import { FriendsCard } from '@/components/userProfile/friendsCard/friendsCard';
import { GroupsCard } from '@/components/userProfile/groupsCard/groupsCard';
import PhotosCard from '@/components/userProfile/photosCard/photosCard';
import { UserCard } from '@/components/userProfile/userCard/userCard';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Gallery from '@/components/gallery/main/page';
import { getSession } from 'next-auth/react';
import { ProfileInfo } from '@/components/userProfile/profileInfo/profileInfo';
import { ComponentName } from '@/enums/all.enum';

export default function Profile(props:any) {
  const [component, setComponent] = useState<ComponentName>(ComponentName.Connections);
  const [session, setSession] = useState<any>(null);

  const load = async () => {
    const result = await getSession();
    setSession(result);
  }
  
  useEffect(() => {
    load();
  }, []);

  const changeComponent =() =>{
    if (component === ComponentName.AboutMe) return (<ProfileInfo />)
    else if(component === ComponentName.Groups) return(<GroupsCard />)
    else if(component === ComponentName.Connections) return(<ConnectionsCard myId={session?.user.id} userId={props.params.id[0]} />)
    else if (component === ComponentName.Gallery) return (<Gallery myId={session?.user.id} userId={props.params.id[0]} />)
    else return(<></>)
  }
  return (
    <>
      <main>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <UserCard setComponent={setComponent} component={component} myId={session?.user.id} userId={props.params.id[0]} />
            {changeComponent()}
          </div>
          <div className={styles.rightContainer}>
            
              <AboutCard />   
              <PhotosCard />
              <FriendsCard />
            
          </div>
        </div>
      </main>
    </>
  )
}