import { AboutCard } from '@/components/userProfile/aboutCard/aboutCard'
import { FriendsCard } from '@/components/userProfile/friendsCard/friendsCard'
import { PhotosCard } from '@/components/userProfile/photosCard/photosCard'
import styles from './styles.module.scss'

export default function Profile() {
  return (
    <>
      <main>
        <div className={styles.container}></div>
        <div className={styles.aboutContainer}>
          <AboutCard />
          <FriendsCard />
          <PhotosCard />
        </div>
      </main>
    </>
  )
}