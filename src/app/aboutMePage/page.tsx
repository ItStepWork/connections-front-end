import { AboutCard } from '@/components/userProfile/aboutCard/aboutCard'
import { FriendsCard } from '@/components/userProfile/friendsCard/friendsCard'
import { PhotosCard } from '@/components/userProfile/photosCard/photosCard'
import { ProfileInfo } from '@/components/userProfile/profileInfo/profileInfo'
import { UserCard } from '@/components/userProfile/userCard/userCard'
import styles from './styles.module.scss'

export default function Profile() {
  return (
    <>
      <main>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <UserCard />
            <ProfileInfo />
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