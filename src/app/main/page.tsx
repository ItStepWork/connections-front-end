"use client"
import Gallery from "@/components/gallery/main/page";

import { Feed } from "@/components/main/feed/feed";
import { FollowsBlock } from "@/components/main/follows/followsBlock";
import { LeftBlockFooter } from "@/components/main/leftBlockFooter/leftBlockFooter";
import { LeftUserBlock } from "@/components/main/leftUserBlock/leftUserBlock";
import { News } from "@/components/main/news/news";
import { AddStories } from "@/components/main/stories/addStories";
import { Stories } from '@/components/main/stories/stories';
import { GroupsCard } from "@/components/userProfile/groupsCard/groupsCard";
import { useSession } from "next-auth/react";
import { useState } from 'react';
import styles from './styles.module.scss';
import Celebration from "@/components/main/celebrations/page";

export default function Home(props: any) {

  const { data: session } = useSession();
  const [component, setComponent] = useState("");
  const ChangeComponent = () => {
    if (component === "groups") return (<GroupsCard />)
    else if (component === "celebration") return (<Celebration />)
    else if (component === "gallery") return (<Gallery session={session} />)
    else return (
      <>
        <div>
          <div className={styles.storiesBlock}>
            <AddStories />
            <Stories />
          </div>
          <Feed />
        </div>
        <div>
          <FollowsBlock />
          <News />
        </div>
      </>)
  }
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.containerContent}>
          <div>
            <LeftUserBlock setComponent={setComponent} />
            <LeftBlockFooter />
          </div>
          {ChangeComponent()}
        </div>
      </div>
    </main>
  )
}
