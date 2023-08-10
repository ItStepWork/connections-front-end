import styles from './styles.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import Photos from "../photos/page";
import Albums from "../albums/page";

export default function Gallery(props: any) {

  const [component, setComponent] = useState("photos");

  const render = () => {
    if(component === "photos"){
      return (<Photos session={props.session}/>);
    }
    else if(component === "albums"){
      return (<Albums/>);
    }
    else {
      return(<></>);
    }
  }

  return (
    <div className={styles.container}>
      <div className="flex justify-between items-center">
        <h2>Галерея</h2>
        <button className={styles.button}><AiOutlinePlus />&nbsp; Создать альбом</button>
      </div>
      <div className={styles.nav}>
        <div {...component === "photos" ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === "photos" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("photos") }}>Фотографии</button>
        </div>
        <div {...component === "albums" ? { className: `${styles.counterLink}` } : { className: "" }} >
          <button {...component === "albums" ? { className: `${styles.linkUnderline}` } : { className: `${styles.link}` }} onClick={() => { setComponent("albums") }}>Альбомы</button>
        </div>
      </div>
      {render()}
    </div>
  )
}