import styles from '../components/userProfile/aboutCard/aboutCard.module.scss'

export const AboutMePreloader = () => {
  return (
    <>
     <div className={styles.container}>
        <div className={styles.header}>
          <h2>Немного про себя</h2>
          <div role="status" className={styles.preloaderContainer}>
            <div className={styles.preloaderStr1}></div>
            <div className={styles.preloaderStr3}></div>
            <div className={styles.preloaderStr2}></div>
            <div className={styles.preloaderStr2}></div>
          </div>
        </div>
      </div>
    </>
  )
}