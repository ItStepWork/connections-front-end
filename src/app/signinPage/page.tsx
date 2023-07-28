"use client"

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import type { FormEventHandler } from "react";
import styles from './styles.module.scss';

export default function Signin() {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res && !res.error) {
      router.push("/profilePage");
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
              <h2 className={styles.textH2}>Sign In</h2>
              <span>Don't have an account? <a className={styles.link} href="signupPage">Click here to sign up</a></span>
            </div>
            <form className={styles.formSignUp} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>Email address</label>
                <input type="email" name="email" className={styles.input} placeholder="email@gmail.com" required/>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.inputLabel}>Password</label>
                <input type="password" name="password" className={styles.input} placeholder="•••••••••" required/>
              </div>
              <div className={styles.centerContainer}>
                <button className={styles.button} type='submit'>Sign In</button>
              </div>
            </form>
            <p>©2023 <a className={styles.link} target="_blank" href={process.env.NEXTAUTH_URL}>Connections.</a> All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
