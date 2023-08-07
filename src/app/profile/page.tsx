"use client"
import { AboutCard } from '@/components/userProfile/aboutCard/aboutCard';
import { ConnectionsCard } from '@/components/userProfile/connectionsCard/connectionsCard';
import { FriendsCard } from '@/components/userProfile/friendsCard/friendsCard';
import { GroupsCard } from '@/components/userProfile/groupsCard/groupsCard';
//import { PhotosCard } from '@/components/userProfile/photosCard/photosCard';
import PhotosCard from '@/components/userProfile/photosCard/photosCard';
import { UserCard } from '@/components/userProfile/userCard/userCard';
import { useState } from 'react';
import styles from './styles.module.scss';

//const PhotosCard = lazy(() => import('../../components/userProfile/photosCard/photosCard'));


export default function Profile(props:any) {
  const [component, setComponent] = useState("");
  const ChangeComponent =() =>{
    if(component === "groups") return(<GroupsCard />)
    else if(component === "connections") return(<ConnectionsCard />)
    else return(<ConnectionsCard/>)
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