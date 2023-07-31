import styles from './styles.module.scss'
import React, { useState } from 'react';

export default function FooterBlock(props: any) {
  
  const [text, setText] = useState("");

  const click = async () => {
    if(props.friendId !== undefined){
      const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "User/SendMessage?id=" + props.friendId+"&text=" + text, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + props.token
        },
      });
  
      if (response.ok) {
        let result = await response.json();
        console.log(result);
      }
    }
  }
  function handleChange(event: any) {
    setText(event.target.value);
  }

  return (
    <>
      <div className={styles.container}>
        <hr className={styles.hr}/>
        <div className={styles.verticalContainer}>
          <textarea className={styles.textarea} onChange={handleChange}></textarea>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={click}>
              <svg className='fill-white' height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}