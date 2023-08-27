import styles from './footer.module.scss';
const Footer = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.links}>
          <ul className={styles.list}>
            <li><a href="">О нас</a></li>
            <li><a href="">Помощь</a></li>
            <li><a href="">Конфиденциальность и условия</a></li>
            <li><a href="">Партнерство</a></li>
            <li><a href="">Защита</a></li>
          </ul>
          <div className={styles.copyright}>
            <p>©2023 <a className={styles.brandLink} href="">Connections</a> Все права защищены.</p>
            </div>
        </div>
      </div>
    </>
  )
};

export default Footer;
