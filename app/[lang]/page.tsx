import localFont from "next/font/local"
import { Locale } from "../../i18n.config"
import { getDictionary } from "../../locale-dictionary"
import styles from './home.module.scss'

const oneDay = localFont({ src: '../../fonts/ONEDAY.ttf'})

export default async function Home({lang} : {lang: Locale}){

  const dict = await getDictionary(lang)

  return (
    <>
    <main className="flex flex-col justify-between ">
      <div className={styles.container}>
        { /*}
        <div className={styles.mainLabel}>
          <canvas id="canvas"></canvas>

        </div>
        */}
        <div className="">
          <p className={oneDay.className}>Connections - мир бесконечных связей и возможностей! Наша уникальная социальная сеть создана для того, чтобы объединить людей со всего мира. Здесь вы можете находить друзей, делиться своими интересами, обсуждать темы, которые вам близки, и находить вдохновение в сообществе единомышленников. Насладитесь безопасной и дружелюбной атмосферой, где каждый может быть самим собой и раскрыть свой потенциал. Присоединяйтесь к Connections и расширяйте свой круг общения просто кликом!</p>
          <p className={oneDay.className}>{dict.copyright}</p>
        </div>
        <script type="text/javascript" src="/static/particleAnimation.js"></script> 
      </div>
     {/* <Footer/>*/}
    </main>
    </>
  )
}