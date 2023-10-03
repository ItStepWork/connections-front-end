import styles from "./page-loader.module.scss";

const PageLoader = (props : any) => {
  return (
    <>
      <div className={styles.loader}>
        <p>loading</p>
      </div>
    </>
  )
};

export default PageLoader;
