'use client'
import HeaderBlock from '@/components/messaging/headerBlock/page';
import styles from './styles.module.scss'
import React, { useState } from 'react';
import MainBlock from '@/components/messaging/mainBlock/page';
import FooterBlock from '@/components/messaging/footerBlock/page';

export default function Messaging() {

  const [name, setName] = useState("");

  const click = (e: string) => {
    if (name !== e) {
      setName(e);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.centerContainer}>
          <div className={styles.leftContainer}>
            <ul className={styles.users}>
              <li onClick={() => click("Valik Lola")} {...name === "Valik Lola" ? { className: "bg-slate-200 rounded-lg dark:bg-zinc-700" } : { className: "" }}>
                <div className={styles.user}>
                  <img className={styles.userImage} src="../favicon.ico" alt="Rounded avatar" />
                  <div className={styles.userInfo}>
                    <span>Valik Lola</span>
                    <span className={styles.userMessage}>Привет нормально так дела идут</span>
                  </div>
                </div>
              </li>
              <li onClick={() => click("Roman Loboda")} {...name === "Roman Loboda" ? { className: "bg-slate-200 rounded-lg dark:bg-zinc-700" } : { className: "" }}>
                <div className={styles.user}>
                  <img className={styles.userImage} src="../favicon.ico" alt="Rounded avatar" />
                  <div className={styles.userInfo}>
                    <span>Roman Loboda</span>
                    <span className={styles.userMessage}>Привет как дела?</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <hr className={styles.hr} />
          <div className={styles.rightContainer}>
            <HeaderBlock />
            <MainBlock/>
            <FooterBlock/>
          </div>
        </div>
      </div>
    </>
  )
}