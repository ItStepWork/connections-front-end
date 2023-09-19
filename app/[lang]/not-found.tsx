import { Jura } from 'next/font/google';
import Link from 'next/link';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import styles from './not-found.module.scss';

const juraFont = Jura({ subsets: ['latin'] })

export default function NotFound(){

  return (
    <>
      <div className={styles.container}>
        <div className={juraFont.className}>
          <h1>ERROR 404:</h1>
          <p>Page not found</p>
        </div>
        <div className={juraFont.className}>
            <h2>Go to main 
              <button className={styles.button}>
                <Link className={styles.link} href="/main"><IoReturnDownBackOutline size={20}/></Link>
              </button>
            </h2>
          </div>
        </div>
    </>
  )
};
