'use client'

import styles from './styles.module.scss';
import React from 'react';

export default function LoginPage() {
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signIn = async () => {
    let response = await fetch("https://localhost:7297/Auth/Login?email=" + email + "&password=" + password);
    let result = await response.json();
    if(response.status === 200){

    }
    else{
      console.log(result);
    }
  }

  const signUp = async () =>{
    let response = await fetch("https://localhost:7297/Auth/Registration?email=" + email + "&password=" + password);
    let result = await response.json();
    if(response.status === 200){

    }
    else{
      console.log(result);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.verticalContainer}>
            <div className="mb-6">
              <label htmlFor="email" className={styles.inputLabel}>Email address</label>
              <input type="email" id="email" className={styles.input} placeholder="email@gmail.com" required onChange={(e) => {setEmail(e.target.value);}} />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className={styles.inputLabel}>Password</label>
              <input type="password" id="password" className={styles.input} placeholder="•••••••••" required onChange={(e) => {setPassword(e.target.value);}}/>
            </div>
            <div className={styles.horizontalContainer}>
              <button className={styles.button} onClick={signIn}>Sign In</button>
              <button className={styles.button} onClick={signUp}>Sign Up</button>
            </div>
          </div>
      </div>
    </>
  )
}