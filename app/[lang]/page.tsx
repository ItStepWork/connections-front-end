import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { Locale } from "../../i18n.config";
import { getDictionary } from "../../locale-dictionary";
import LandingCard from "./components/landing-card/landing-card";
import styles from './home.module.scss';

const oneDay = localFont({ src: '../../fonts/ONEDAY.ttf'})
const mont = Montserrat({ subsets: ['latin'] })

export default async function Home({ params: { lang }}: { params: { lang: Locale }}, props : any){
  
  const local = await getDictionary(lang)

  return (
    <>
    <div className={styles.main}>
    <video id="background-video" autoPlay loop muted className={styles.background}>
      <source src="/bg.mp4" type="video/mp4"></source>
    </video>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <p className={oneDay.className}>Connections - <span className={mont.className}>{local.landing.title}</span></p>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.img} src="/landing-phone.jpg" alt="phone" />
          <div className={styles.notebookContainer}>
            <div className={styles.cards}>
              <LandingCard path='/icons/computer.png' title={local.landing.gadget.title} text={local.landing.gadget.text}/>
              <LandingCard path='/icons/mobile.png' title={local.landing.gadget.title2} text={local.landing.gadget.text2}/>
            </div>
            <img className={styles.img} src="/landing-note.jpg" alt="note" />
          </div>
        </div>
        <div className={styles.messagingContainer}>
          <h2>{local.landing.subtitle}</h2>
          <div className={styles.cardContainer}>
            <LandingCard path='/icons/notify-heart.png' title={local.landing.messaging.title} text={local.landing.messaging.text}/>
            <LandingCard path='/icons/chat-text.png' title={local.landing.messaging.title2} text={local.landing.messaging.text2}/>
            <LandingCard path='/icons/picture.png' title={local.landing.messaging.title3} text={local.landing.messaging.text3}/>
          </div>
        </div>
         <div className={styles.messagingContainer}>
          <h2>{local.landing.subtitle2}</h2>
          <div className={styles.cardContainer}>
            <LandingCard path='/icons/fire.png' title={local.landing.posts.title} text={local.landing.posts.text}/>
            <LandingCard path='/icons/groups.png' title={local.landing.posts.title2} text={local.landing.posts.text2}/>
            <LandingCard path='/icons/lock.png' title={local.landing.posts.title3} text={local.landing.posts.text3}/>
          </div>
        </div>
        <div className={styles.messagingContainer}>
          <h2>{local.landing.subtitle3}</h2>
          <div className={styles.cardContainer}>
            <LandingCard path='/icons/photo.png' title={local.landing.gallery.title} text={local.landing.gallery.text}/>
            <LandingCard path='/icons/albums.png' title={local.landing.gallery.title2} text={local.landing.gallery.text2}/>
            <LandingCard path='/icons/likes.png' title={local.landing.gallery.title3} text={local.landing.gallery.text3}/>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}