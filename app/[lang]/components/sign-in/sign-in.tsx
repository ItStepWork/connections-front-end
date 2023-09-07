"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { FormEventHandler } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '../../../../stores/userDataStore';
import styles from './sign-in.module.scss';

export const SignIn = ({local} : {local : any}, props : any) => {

  const router = useRouter();
  const { fetchUser } = useStore((state) => state)
  const notifyLogin = () => toast.success("Успешный вход!",{});
  const notifyError = () => toast.error("Вход не выполнен!",{});

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res && !res.error) {
      notifyLogin();
      router.push('/main');
    } else {
      console.log(res);
      notifyError();
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
      <div className={styles.centerContainer}>
        <div className={styles.verticalContainer}>
          <div className={styles.cardSignUp}>
            <div className={styles.textCenter}>
              <h2 className={styles.textH2}>{local.signIn.title}</h2>
              <span>{local.signIn.description}<a className={styles.link} href="signUp">{local.signIn.toSignUp}</a></span>
            </div>
            <form className={styles.formSignUp} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>Email:</label>
                <input type="email" name="email" className={styles.input} placeholder="email@gmail.com" required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.inputLabel}>{local.signIn.passLabel}</label>
                <input type="password" name="password" className={styles.input} placeholder="•••••••••" required />
              </div>
              <div className={styles.centerContainer}>
                <button className={styles.button} onClick={() => fetchUser()} type='submit'>{local.signIn.logInBtn}</button>
              </div>
            </form>
            <p>©2023 <a className={styles.link} target="_blank" href={process.env.NEXTAUTH_URL}>Connections.</a>{local.copyright}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
};
