"use client"
import React, { useState } from 'react';
import { Feed } from "@/components/main/feed/feed";
import { Follows } from "@/components/main/follows/follows";
import { LeftBlockFooter } from "@/components/main/leftBlockFooter/leftBlockFooter";
import { LeftUserBlock } from "@/components/main/leftUserBlock/leftUserBlock";
import { News } from "@/components/main/news/news";
import { AddStories } from "@/components/main/stories/addStories";
import { GroupsCard } from "@/components/userProfile/groupsCard/groupsCard";
import styles from './styles.module.scss'
import { Stories } from '@/components/main/stories/stories';

export default function Home(props: any) {

  const [component, setComponent] = useState("");
  const ChangeComponent = () => {
    if (component === "groups") return (<GroupsCard />)
   

    else return (<h4>empty</h4>)
  }
  return (
    <main>  
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <LeftUserBlock setComponent={setComponent} />
          <LeftBlockFooter />
        </div>
        <div className={styles.containerCenter}>
          <div className={styles.storiesBlock}>
            <AddStories/>
            <Stories />
          </div>
          <Feed />

          {ChangeComponent()}
        </div>
        <div className={styles.containerRight}>
          <Follows />
          <News />
        </div>
      </div>
    </main>
  )
}
