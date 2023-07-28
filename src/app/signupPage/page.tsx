"use client"
import styles from './styles.module.scss';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (data.password === data.confirmPassword){
      let response = await fetch("http://localhost:5288/Auth/SignUp?email=" + data.email + "&password=" + data.password, {method: "POST"});
      let result = await response.text();
      alert(result);
    }
    else alert("Password mismatch");
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.centerContainer}>
        <div className={styles.verticalContainer}>
          <div className={styles.cardSignUp}>
            <div className={styles.textCenter}>
              <h2 className={styles.textH2}>Sign up</h2>
              <span>Already have an account? <a className={styles.link} href="signinPage">Sign in here</a></span>
            </div>
            <form className={styles.formSignUp} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>Email address</label>
                <input type="email" className={styles.input} placeholder="Enter email" {...register('email')} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.inputLabel}>Password</label>
                <input type="password"  className={styles.input} placeholder="Enter password" {...register('password')}/>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.inputLabel}>Confirm password</label>
                <input type="password" className={styles.input} placeholder="Enter confirm password" {...register('confirmPassword')}/>
              </div>
              <div className={styles.centerContainer}>
                <button className={styles.button} type='submit'>Sign Up</button>
              </div>
            </form>
            <p>©2023 <a className={styles.link} target="_blank" href={process.env.NEXTAUTH_URL}>Connections.</a> All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
