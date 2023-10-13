import localFont from 'next/font/local';
import Link from 'next/link';
import { Locale } from '../../../../i18n.config';
import { getDictionary } from '../../../../locale-dictionary';
import styles from './footer.module.scss';

const oneDay = localFont({ src: '../../../../fonts/ONEDAY.ttf' })

const Footer = async ({ lang }: { lang: Locale }) => {
  const locDictionary = await getDictionary(lang)
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.links}>
            <ul className={styles.list}>
              <li><Link href={`/${lang}/`}>{locDictionary.footer.about}</Link></li>
              <li><Link href={`/${lang}/help`}>{locDictionary.footer.help}</Link></li>
              <li><Link href={`/${lang}/privacy`}>{locDictionary.footer.privacy}</Link></li>
              <li><Link href={`/${lang}/terms`}>{locDictionary.footer.terms}</Link></li>
              <li><Link href={`/${lang}/protect`}>{locDictionary.footer.protect}</Link></li>
            </ul>
          </div>
          <div className={styles.copyright}>
            <p>©2023 <Link className={styles.brandLink} href={`/${lang}/`}><span className={oneDay.className}>Connections</span></Link> {locDictionary.copyright}</p>
          </div>
        </div>
      </div>
    </>
  )
};

export default Footer;
