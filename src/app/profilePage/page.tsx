import { AboutCard } from '@/components/userProfile/aboutCard/aboutCard'
import { ConnectionsCard } from '@/components/userProfile/connectionsCard/connectionsCard'
import { FriendsCard } from '@/components/userProfile/friendsCard/friendsCard'
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
            <ConnectionsCard />
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