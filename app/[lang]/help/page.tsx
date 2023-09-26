import styles from "./styles.module.scss";

const Help = () => {
  return (
    <>
      <div className={styles.container}>
      <ul>
 <li>Пункт 1.</li>
  <li>Пункт 2.
    <ul>
      <li>Подпункт 2.1.</li>
       <li>Подпункт 2.2.     
        <ul>
          <li>Подпункт 2.2.1.</li>
          <li>Подпункт 2.2.2.</li>
          </ul>
       </li>          
      <li>Подпункт 2.3.</li>
    </ul>
  </li>
 <li>Пункт 3.</li>
</ul>
      </div>
    </>
  )
};

export default Help;
