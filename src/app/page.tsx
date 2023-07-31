import { Feed } from "@/components/main/feed/feed";
import { Follows } from "@/components/main/follows/follows";
import { LeftBlockFooter } from "@/components/main/leftBlockFooter/leftBlockFooter";
import { LeftUserBlock } from "@/components/main/leftUserBlock/leftUserBlock";
import { News } from "@/components/main/news/news";
import { Stories } from "@/components/main/stories/stories";

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="main__left">
          <LeftUserBlock />
          <LeftBlockFooter />
        </div>
        <div className="main__center">
          <Stories />
          <Feed />
        </div>
        <div className="main__right">
          <Follows />
          <News />
        </div>
      </div>
    </main>
  )
}
