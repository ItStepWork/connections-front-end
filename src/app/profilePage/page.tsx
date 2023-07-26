import { AboutCard } from '@/components/userProfile/aboutCard/aboutCard'
import styles from './styles.module.scss'


export default function Profile() {
  return (
    <>
      <main>
        <div className={styles.container}></div>
        <div className={styles.aboutContainer}>
          <AboutCard />
        </div>
      </main>
    </>
  )
}