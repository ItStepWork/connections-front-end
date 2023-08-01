import styles from './styles.module.scss'
import React, { useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';

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
  
      setText("");
      if (response.ok) {
        let result = await response.json();
        console.log(result);
        props.load(props.friendId, props.token);
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
          <textarea className={styles.textarea} onChange={handleChange} value={text}></textarea>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={click}>
              <BsFillSendFill className='fill-white'/>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}