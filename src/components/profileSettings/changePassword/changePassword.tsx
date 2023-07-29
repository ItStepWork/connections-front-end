import { FC } from "react"
import styles from "./changePassword.module.scss"

export const ChangePassword: FC = () => {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.description}>
          <h2>Измените ваш пароль</h2>
          <span>В макете тут написан тупорылый текст но я думаю что это не правильно</span>
        </div>
        <form className={styles.form}>
          <div className={styles.namesBlock}>
            <div className={styles.inputContainer}>
              <label htmlFor="CurrentPassword" className={styles.inputLabel}>Текущий пароль</label>
              <input type="text" id="CurrentPassword" className={styles.label} placeholder="введите старый пароль" required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="password" className={styles.inputLabel}>Новый пароль</label>
              <input type="password" id="password" className={styles.label} placeholder="введите новый пароль" required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="ConfirmPassword" className={styles.inputLabel}>Подтвердите пароль</label>
              <input type="text" id="ConfirmPassword" className={styles.label} placeholder="подтвердите новый пароль" required />
            </div>
          </div>
          <div className={styles.formButton}>
            <button type="submit" className={styles.button}>Обновить пароль</button>
          </div>
        </form>
      </section>
    </>
  )
}