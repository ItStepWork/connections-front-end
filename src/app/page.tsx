import localFont from "next/font/local"
import styles from './home.module.scss'

const arenq = localFont({ src: '../fonts/Arenq.otf'})
const lombok = localFont({ src: '../fonts/Lombok Regular.ttf'})
const oneDay = localFont({ src: '../fonts/ONEDAY.ttf'})

export default function Home(){


  return (
    <>
    <main>
      <div className="container">
        <div className={styles.mainLabel}>
          <canvas id="canvas1"></canvas>

        </div>
          <div className="pt-96 z-10">
            <p className={oneDay.className}>Connections - мир бесконечных связей и возможностей! Наша уникальная социальная сеть создана для того, чтобы объединить людей со всего мира. Здесь вы можете находить друзей, делиться своими интересами, обсуждать темы, которые вам близки, и находить вдохновение в сообществе единомышленников. Насладитесь безопасной и дружелюбной атмосферой, где каждый может быть самим собой и раскрыть свой потенциал. Присоединяйтесь к Connections и расширяйте свой круг общения просто кликом!</p>
          </div>
        <script type="text/javascript" src="/static/particleAnimation.js"></script> 
      </div>
    </main>
    </>
  )
}