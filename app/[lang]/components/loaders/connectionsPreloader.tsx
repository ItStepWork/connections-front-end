import styles from '../userProfile/connectionsCard/connectionsCard.module.scss';

export const ConnectionsPreloader = () => {
  return (
    <>
      <div className={styles.container}>
        <h2>Связи</h2>
        <div role="status" className={styles.preloaderContainer}>
          <div className={styles.div1}>
            <div>
              <div className={styles.str1}></div>
              <div className={styles.str2}></div>
            </div>
            <div className={styles.str3}></div>
          </div>
          <div className={styles.div2}>
            <div>
                <div className={styles.str1}></div>
                <div className={styles.str2}></div>
            </div>
            <div className={styles.str3}></div>
          </div>
          <div className={styles.div2}>
            <div>
                <div className={styles.str1}></div>
                <div className={styles.str2}></div>
            </div>
            <div className={styles.str3}></div>
          </div>
          <div className={styles.div2}>
            <div>
                <div className={styles.str1}></div>
                <div className={styles.str2}></div>
            </div>
            <div className={styles.str3}></div>
          </div>
          <div className={styles.div2}>
            <div>
                <div className={styles.str1}></div>
                <div className={styles.str2}></div>
            </div>
            <div className={styles.str3}></div>
          </div>
        </div>
      </div >
    </>
  )
}