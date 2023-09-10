import styles from "./page-loader.module.scss";

const PageLoader = () => {
  return (
    <>
      <div className={styles.loader}>
        <div className={styles.loaderInner}>
          <div className={styles.loaderBlock}></div>
          <div className={styles.loaderBlock}></div>
          <div className={styles.loaderBlock}></div>
          <div className={styles.loaderBlock}></div>
          <div className={styles.loaderBlock}></div>
          <div className={styles.loaderBlock}></div>
          <div className={styles.loaderBlock}></div>
          <div className={styles.loaderBlock}></div>
        </div>
      </div>
    </>
  )
};

export default PageLoader;
