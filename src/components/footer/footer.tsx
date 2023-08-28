'use client'
import Link from 'next/link';
import { toast } from 'react-toastify';
import styles from './footer.module.scss';
const Footer = () => {
  const notifyInfo = () => toast.info("В разработке!",{});

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.links}>
            <ul className={styles.list}>
              <li><Link onClick={notifyInfo} href="/">О нас</Link></li>
              <li><Link onClick={notifyInfo} href="/">Помощь</Link></li>
              <li><Link onClick={notifyInfo} href="/">Конфиденциальность и условия</Link></li>
              <li><Link onClick={notifyInfo} href="/">Партнерство</Link></li>
              <li><Link onClick={notifyInfo} href="/">Защита</Link></li>
            </ul>
          </div>
          <div className={styles.copyright}>
            <p>©2023 <Link className={styles.brandLink} href="/">Connections</Link> Все права защищены.</p>
          </div>
        </div>
      </div>
    </>
  )
};

export default Footer;
