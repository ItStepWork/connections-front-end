import styles from '../userProfile/friendsCard/friendsCard.module.scss'

export const FriendsPreloader = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.friends}>
            <h2>Друзья</h2>
          </div>
          <button className={styles.button}>Все друзья</button>
        </div>
        <div className={styles.cardsContainer}> 
            <div role="status" className={styles.preloadContainer}>
              <div className={styles.preloaderContainer2}>
                <svg className={styles.preloaderSVG} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                </svg>
              </div>
              <div className={styles.preloaderStr1}></div>
              <div className={styles.preloaderStr2}></div>
              <div className={styles.preloaderStr2}></div>
              <div className={styles.preloaderStr2}></div>
            </div>
            <div role="status" className={styles.preloadContainer}>
              <div className={styles.preloaderContainer2}>
                <svg className={styles.preloaderSVG} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                </svg>
              </div>
              <div className={styles.preloaderStr1}></div>
              <div className={styles.preloaderStr2}></div>
              <div className={styles.preloaderStr2}></div>
              <div className={styles.preloaderStr2}></div>
            </div>
          </div>
        </div>
    </>
  )
}