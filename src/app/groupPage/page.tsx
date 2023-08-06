"use client"
import { Feed } from '@/components/main/feed/feed'
import { Follows } from '@/components/main/follows/followsBlock'
import { LeftBlockFooter } from '@/components/main/leftBlockFooter/leftBlockFooter'
import { LeftUserBlock } from '@/components/main/leftUserBlock/leftUserBlock'
import { News } from '@/components/main/news/news'
import { Stories } from '@/components/main/stories/addStories'
import { GroupsCard } from '@/components/userProfile/groupsCard/groupsCard'
import { useState } from 'react'
import { GroupCard } from './groupCard/groupCard'
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