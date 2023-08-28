"use client"

import { useStore } from "@/stores/userDataStore";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { FormEventHandler } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.scss';


export default function Signin() {
  const router = useRouter();
  const { fetchUser } = useStore((state) => state)
  const notify = () => toast.success("Успешный вход!",{});

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res && !res.error) {
      router.push("/main");
    } else {
      console.log(res);
    }
  };

  return (

    <div className={styles.mainContainer}>
      <div className={styles.centerContainer}>
        <div className={styles.verticalContainer}>
          <div className={styles.cardSignUp}>
            <div className={styles.textCenter}>
              <h2 className={styles.textH2}>Вход</h2>
              <span>У вас нет аккаунта? <a className={styles.link} href="signUp">перейти к регистрации</a></span>
            </div>
            <form className={styles.formSignUp} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>Email</label>
                <input type="email" name="email" className={styles.input} placeholder="email@gmail.com" required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.inputLabel}>Пароль</label>
                <input type="password" name="password" className={styles.input} placeholder="•••••••••" required />
              </div>
              <div className={styles.centerContainer}>
                <button className={styles.button} onClick={() => [fetchUser, notify()]} type='submit'>Войти</button>
              </div>
            </form>
            <p>©2023 <a className={styles.link} target="_blank" href={process.env.NEXTAUTH_URL}>Connections.</a> Все права защищены</p>
          </div>
        </div>
      </div>
      <ToastContainer 
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
