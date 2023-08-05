"use client"
import React, { useState } from 'react';
import { Feed } from "@/components/main/feed/feed";
import { Follows } from "@/components/main/follows/follows";
import { LeftBlockFooter } from "@/components/main/leftBlockFooter/leftBlockFooter";
import { LeftUserBlock } from "@/components/main/leftUserBlock/leftUserBlock";
import { News } from "@/components/main/news/news";
import { Stories } from "@/components/main/stories/stories";
import { GroupsCard } from "@/components/userProfile/groupsCard/groupsCard";
import { UserStoreDto } from '@/dto/userDataDto';

export default function Home(props: any) {

  const [component, setComponent] = useState("");
  const ChangeComponent = () => {
    if (component === "groups") return (<GroupsCard />)
   

    else return (<h4>empty</h4>)
  }
  return (
    <main>
      
      <div className="flex ">
        <div className="main__left">
          <LeftUserBlock setComponent={setComponent} />
          <LeftBlockFooter />
        </div>
        <div className="main__center">
          <Feed />
          <Stories />

          {ChangeComponent()}
        </div>
        <div className="main__right">
          <Follows />
          <News />
        </div>
      </div>
    </main>
  )
}
