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

export default function Profile(props:any) {
  const [component, setComponent] = useState("");
  const [session, setSession] = useState<any>(null);

  const load = async () => {
    const result = await getSession();
    setSession(result);
  }
  
  useEffect(() => {
    load();
  }, []);

  const ChangeComponent =() =>{
    if(component === "groups") return(<GroupsCard />)
    else if(component === "connections") return(<ConnectionsCard myId={session?.user.id} userId={props.params.id[0]} />)
    else if (component === "gallery") return (<Gallery myId={session?.user.id} userId={props.params.id[0]} />)
    else return(<ConnectionsCard myId={session?.user.id} userId={props.params.id[0]} />)
  }
  return (
    <>
      <main>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <UserCard setComponent={setComponent}/>
            {ChangeComponent()}
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