import { useSession } from "next-auth/react";
import styles from './styles.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';

export function Gallery(props: any) {

  const [component, setComponent] = useState("");

  return (
    <div className={styles.container}>
      <div className="flex justify-between items-center">
        <h2>Галерея</h2>
        <button className={styles.button}><AiOutlinePlus />&nbsp; Создать альбом</button>
      </div>
      <div className={styles.nav}>
          <div {...component === ""?{className:`${styles.counterLink}`}:{className:""}} >
            <button {...component === ""?{className:`${styles.linkUnderline}`}:{className:`${styles.link}`}} onClick={()=>{setComponent("")}}>Фотографии</button>
          </div>
          <div {...component === "albums"?{className:`${styles.counterLink}`}:{className:""}} >
            <button {...component === "albums"?{className:`${styles.linkUnderline}`}:{className:`${styles.link}`}} onClick={()=>{setComponent("albums")}}>Альбомы</button>
          </div>
        </div>
    </div>
  )
}
export default () => {
  const { data: session } = useSession();
  let user: any = session?.user;
  if (session === undefined) {
    return (<></>);
  }
  else
    return (
      <Gallery user={user} />
    )
}