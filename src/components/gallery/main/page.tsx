import styles from './styles.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import Photos from "../photos/page";
import Albums from "../albums/page";
import { getSession } from 'next-auth/react';

export default function Gallery(props: any) {

  const [component, setComponent] = useState("photos");
  const [user, setUser] = useState<any>(null);

  const getUser = async()=>{
    const session = await getSession();
    setUser(session?.user)
  }
  
  useEffect(() => {
    getUser();
  }, []);

  const render = () => {
    if(component === "photos"){
      return (<Photos user={user}/>);
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