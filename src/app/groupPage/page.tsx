"use client"
import { AboutCard } from '@/components/userProfile/aboutCard/aboutCard'
import { FriendsCard } from '@/components/userProfile/friendsCard/friendsCard'
import { GroupsCard } from '@/components/userProfile/groupsCard/groupsCard'
import { PhotosCard } from '@/components/userProfile/photosCard/photosCard'
import { GroupCard } from './groupCard/groupCard'
import styles from './styles.module.scss'
import { LeftUserBlock } from '@/components/main/leftUserBlock/leftUserBlock'
import { LeftBlockFooter } from '@/components/main/leftBlockFooter/leftBlockFooter'
import { Feed } from '@/components/main/feed/feed'
import { Stories } from '@/components/main/stories/stories'
import { Follows } from '@/components/main/follows/follows'
import { News } from '@/components/main/news/news'
import { useState } from 'react'
import { useRouter } from "next/router";
export default function Group() {
  // const router = useRouter();
  const [component, setComponent] = useState("");
  const [groupId, setGroupId] = useState("");
  const ChangeComponent = () => {
    if (component === "groups") return (<GroupsCard />)
   

    else return ( <GroupCard />)
  }
  const getGroupId=()=>{
    
  }
  // let id = router.query;
  // console.log(id);
  return (
    <>
      <main>
        {/* <div className={styles.container}>
          <div className={styles.leftContainer}>
            <UserCard />
            <GroupsCard />
          </div>
          <div className={styles.rightContainer}>
            <AboutCard />
            <PhotosCard />
            <FriendsCard />
          </div>
        </div> */}
        <div className="flex ">
        <div className="main__left">
          <LeftUserBlock setComponent={setComponent} />
          <LeftBlockFooter />
        </div>
        <div className="main__center">
       
        {ChangeComponent()}
          <Feed />
          <Stories />

        </div>
        <div className="main__right">
          <Follows />
          <News />
        </div>
      </div>
      </main>
    </>
  )
}