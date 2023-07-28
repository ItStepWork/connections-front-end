"use client"
import { useSession } from "next-auth/react";
import { FC } from "react";
import styles from "./accountSettings.module.scss";

export const AccountSettings: FC = () => {

  const { data: session } = useSession();
  console.log(session)

  return (
    <>
      <section className={styles.container}>
        <div className={styles.description}>
          <h2>Настройки Аккаунта</h2>
          <span>Здесь будет описание профиля которое человек запишет в text-area ниже потенциально тут может быть много текста, в оригинале что-то про геев было написано, короче непонятно</span>
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
              <label htmlFor="date" className={styles.inputLabel}>Дата рождения</label>
              <input type="date" id="date" className={styles.label} placeholder="введите никнейм" required />
            </div>
          </div>
          <div className={styles.namesBlock}>
            <div className={styles.inputContainer}>
              <label htmlFor="tel" className={styles.inputLabel}>Телефон</label>
              <input type="tel" id="tel" className={styles.label} placeholder="тел.(123-456-7890)" required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="email" className={styles.inputLabel}>Эл. почта</label>
              <input type="email" id="email" className={styles.label} placeholder="mail@gmail.com" required />
            </div>
          </div>
          <div className={styles.namesBlock}>
            <div className={styles.textAreaContainer}>
              <label htmlFor="message" className={styles.textLabel}>Ваше сообщение</label>
              <textarea rows={4} id="message" className={styles.textArea} placeholder="Оставьте свой коментарий..."></textarea>
            </div>
          </div>
          <div className={styles.formButton}>
            <button type="submit" className={styles.button}>Сохранить изменения</button>

          </div>
        </form>
      </section>
    </>
  )
}