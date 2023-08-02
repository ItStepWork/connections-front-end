import { AboutCard } from '@/components/userProfile/aboutCard/aboutCard'
import { FriendsCard } from '@/components/userProfile/friendsCard/friendsCard'
import { GroupsCard } from '@/components/userProfile/groupsCard/groupsCard'
import { PhotosCard } from '@/components/userProfile/photosCard/photosCard'
import { UserCard } from '@/components/userProfile/userCard/userCard'
import styles from './styles.module.scss'

export default function Profile() {
  return (
    <>
      <main>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <UserCard />
            <GroupsCard />
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