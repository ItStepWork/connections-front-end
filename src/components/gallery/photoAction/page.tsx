import styles from './styles.module.scss'
import { useState } from "react";
import { BsPencilFill, BsDownload, BsXLg } from 'react-icons/bs'
import { PiUserFocusBold, PiUserCircleBold } from 'react-icons/pi'

export function PhotoAction(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={() => setIsOpen((prev) => !prev)} onFocus={() => { if (isOpen) setIsOpen(true) }} onBlur={() => setIsOpen(false)} className='rounded-full overflow-hidden'>
          <BsPencilFill size={40} {...isOpen ? { className: "bg-buttonBlue p-3 fill-white" } : { className: "bg-buttonBlueOpacity p-3 fill-buttonBlue" }} />

          {isOpen &&
            <div className={styles.dropMenu}>
              <div className={styles.action}><BsDownload/>&nbsp;Скачать</div>
              <div className={styles.action}><PiUserCircleBold/>&nbsp;Сделать аватаром</div>
              <div className={styles.action}><PiUserFocusBold/>&nbsp;Сделать обложкой</div>
              <hr className={styles.hr} />
              <div className={styles.actionDelete}><BsXLg/>&nbsp;Удалить</div>
            </div>
          }
        </button>
      </div>
    </>
  )
}