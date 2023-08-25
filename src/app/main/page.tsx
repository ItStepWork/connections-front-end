"use client"

import styles from './styles.module.scss';
import Gallery from "@/components/gallery/main/page";
import { Feed } from "@/components/main/feed/feed";
import { FollowsBlock } from "@/components/main/follows/followsBlock";
import { News } from "@/components/main/news/news";
import { AddStories } from "@/components/main/stories/addStories";
import { Stories } from '@/components/main/stories/stories';
import { GroupsCard } from "@/components/userProfile/groupsCard/groupsCard";
import { useSession } from "next-auth/react";
import { useState } from 'react';
import Celebration from "@/components/main/celebrations/page";
import Menu from "@/components/main/menu/page";
import { ConnectionsCard } from '@/components/userProfile/connectionsCard/connectionsCard';

export default function Home(props: any) {

  const { data: session } = useSession();
  const [component, setComponent] = useState("");
  const ChangeComponent = () => {
    if (component === "groups") return (<GroupsCard />)
    else if (component === "celebration") return (<Celebration />)
    else if(component === "connections") return(<ConnectionsCard myId={session?.user.id} userId={session?.user.id} />)
    else if (component === "gallery") return (<Gallery myId={session?.user.id} userId={session?.user.id} />)
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
        <Menu setComponent={setComponent}/>
        <div className={styles.containerContent}>
          {ChangeComponent()}
        </div>
      </div>
    </main>
  )
}
