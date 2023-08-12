import Link from 'next/link';
import styles from './styles.module.scss'
import { useState } from "react";
import { BsPencilFill, BsDownload, BsXLg } from 'react-icons/bs'
import { PiUserFocusBold, PiUserCircleBold } from 'react-icons/pi'

export function PhotoAction(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const setAvatar = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/SetAvatar?url=" + props.photo.url, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + props.accessToken
      },
    });
    if (response.ok) {
      
    }
  }

  const setBackground = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/SetBackground?url=" + props.photo.url, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + props.accessToken
      },
    });
    if (response.ok) {
      
    }
  }

  const removePhoto = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/RemovePhoto?id=" + props.photo.id, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + props.accessToken
      },
    });
    if (response.ok) {
      props.get();
    }
  }

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={() => setIsOpen((prev) => !prev)} onFocus={() => { if (isOpen) setIsOpen(true) }} onBlur={() => setIsOpen(false)} className='rounded-full overflow-hidden'>
          <BsPencilFill size={40} {...isOpen ? { className: "bg-buttonBlue p-3 fill-white" } : { className: "bg-buttonBlueOpacity p-3 fill-buttonBlue" }} />

          {isOpen &&
            <div className={styles.dropMenu}>
              {/* <a className={styles.action}  href={props.photo.url} download><BsDownload />&nbsp;Скачать</a> */}
              <div className={styles.action} onClick={setAvatar}><PiUserCircleBold />&nbsp;Сделать аватаром</div>
              <div className={styles.action} onClick={setBackground}><PiUserFocusBold />&nbsp;Сделать обложкой</div>
              <hr className={styles.hr} />
              <div className={styles.actionDelete} onClick={removePhoto}><BsXLg />&nbsp;Удалить</div>
            </div>
          }
        </button>
      </div>
    </>
  )
}