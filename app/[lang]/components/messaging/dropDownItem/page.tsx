"use client"
import { useState } from "react";
import { HiDotsVertical } from 'react-icons/hi';
import styles from './styles.module.scss';

export default function DropDownItem(props: any) {

  const {
    removeDialog,
    id,
    local
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const click = () =>{
    removeDialog(id);
  }

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={() => setIsOpen((prev) => !prev)} onFocus={() => {if(isOpen)setIsOpen(true)}} onBlur={() => setIsOpen(false)}>
          <HiDotsVertical size={40} {...isOpen?{className:"bg-button_blue_BG p-3 rounded-full fill-white"}:{className:"bg-button_blue_opacity p-3 rounded-full fill-button_blue_BG"}}/>
          
          {isOpen &&
            <div className={styles.dropMenu}>
              <div className='text-dark_text_gray hover:text-button_blue_BG'>{local.main.profile}</div>
              <div className='text-dark_text_gray hover:text-button_red_BG' onClick={click}>{local.chat.delete}</div>
            </div>
          }
        </button>
      </div>
    </>
  )
}