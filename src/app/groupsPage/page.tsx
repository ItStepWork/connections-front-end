import { AboutCard } from '@/components/userProfile/aboutCard/aboutCard'
import { ConnectionsCard } from '@/components/userProfile/connectionsCard/connectionsCard'
import { GroupsCard } from '@/components/userProfile/groupsCard/groupsCard'
import { PhotosCard } from '@/components/userProfile/photosCard/photosCard'
import { UserCard } from '@/components/userProfile/userCard/userCard'
import styles from './styles.module.scss'

export default function Profile() {
  return (
    <>
      <main>
        <div className={styles.container}>
          <UserCard />
          <GroupsCard />
        </div>
      </main>
    </>
  )
}