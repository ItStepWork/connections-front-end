import Link from 'next/link';
import { Locale } from '../../../../i18n.config';
import { getDictionary } from '../../../../locale-dictionary';
import styles from './footer.module.scss';

const Footer = async ({ lang }: { lang: Locale }, props : any) => {
  const locDictionary = await getDictionary(lang)
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.links}>
            <ul className={styles.list}>
              <li><Link href="/">{locDictionary.footer.about}</Link></li>
              <li><Link href="/">{locDictionary.footer.help}</Link></li>
              <li><Link href="/">{locDictionary.footer.privacy}</Link></li>
              <li><Link href="/">{locDictionary.footer.partnership}</Link></li>
              <li><Link href="/">{locDictionary.footer.protect}</Link></li>
            </ul>
          </div>
          <div className={styles.copyright}>
            <p>©2023 <Link className={styles.brandLink} href="/">Connections</Link> {locDictionary.copyright}</p>
          </div>
        </div>
      </div>
    </>
  )
};

export default Footer;
