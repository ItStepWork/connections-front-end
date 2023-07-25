import { FC } from "react"
import styles from "./accountSettings.module.scss"

export const AccountSettings: FC = () => {
  return (
    <>
      <section className={styles.container}>
        <div>
          <h2>Account Settings</h2>
          <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate alias debitis tempora ullam nesciunt autem architecto dolorem dignissimos rerum doloremque esse perspiciatis tempore aspernatur rem, ea provident sapiente maxime veniam!</span>
        </div>
        <form className={styles.form}>
          <div className={styles.namesBlock}>
            <div className={styles.inputContainer}>
              <label htmlFor="text" className={styles.inputLabel}>Имя</label>
              <input type="text" id="fName" className={styles.label} placeholder="введите имя" required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="text" className={styles.inputLabel}>Фамилия</label>
              <input type="text" id="sName" className={styles.label} placeholder="введите фамилию" required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="text" className={styles.inputLabel}>Никнейм</label>
              <input type="text" id="sNickname" className={styles.label} placeholder="введите никнейм" required />
            </div>
          </div>
        </form>
      </section>
    </>
  )
}