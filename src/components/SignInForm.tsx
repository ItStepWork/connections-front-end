"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import type { FormEventHandler } from "react";
import styles from '../app/signinPage/styles.module.scss';

const SignInForm = () => {
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
        <form onSubmit={handleSubmit} className="login-form">
          <div className={styles.verticalContainer}>
            <div className="mb-6">
              <label htmlFor="email" className={styles.inputLabel}>Email address</label>
              <input type="email" name="email" className={styles.input} placeholder="email@gmail.com" required/>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className={styles.inputLabel}>Password</label>
              <input type="password" name="password" className={styles.input} placeholder="•••••••••" required/>
            </div>
            <div className={styles.horizontalContainer}>
              <button className={styles.button} type="submit">Sign In</button>
            </div>
          </div>
        </form>
  );
};

export { SignInForm };