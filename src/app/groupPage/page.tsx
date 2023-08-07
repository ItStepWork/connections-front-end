"use client"
import { AddPost } from '@/components/main/addPost/addPost'
// import { Follows } from '@/components/main/follows/followsBlock'
import { LeftBlockFooter } from '@/components/main/leftBlockFooter/leftBlockFooter'
import { LeftUserBlock } from '@/components/main/leftUserBlock/leftUserBlock'
import { News } from '@/components/main/news/news'
import { Stories } from '@/components/main/stories/stories'
import { GroupsCard } from '@/components/userProfile/groupsCard/groupsCard'
import { useState } from 'react'
import { GroupCard } from './groupCard/groupCard'
import styles from './styles.module.scss';
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
      <main  className={styles.container}>
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
        {/* <div className={styles.container}> */}
        <div className={"main__left"}>
          <LeftUserBlock setComponent={setComponent} />
          <LeftBlockFooter />
        </div>
        <div className={styles.rightContainer}>
       
        {ChangeComponent()}
          <AddPost/>
          {/* <Stories /> */}

        </div>
        
      {/* </div> */}
      </main>
    </>
  )
}