import { useState } from "react";
import { HiDotsVertical } from 'react-icons/hi';
import styles from './styles.module.scss';

export function DropDownItem(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const click = () =>{
    props.removeDialog(props.id);
  }

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={() => setIsOpen((prev) => !prev)} onFocus={() => {if(isOpen)setIsOpen(true)}} onBlur={() => setIsOpen(false)}>
          <HiDotsVertical size={40} {...isOpen?{className:"bg-button_blue_BG p-3 rounded-full fill-white"}:{className:"bg-button_blue_opacity p-3 rounded-full fill-button_blue_BG"}}/>
          
          {isOpen &&
            <div className={styles.dropMenu}>
              <div className='text-dark_text_gray hover:text-button_blue_BG'>View profile</div>
              <div className='text-dark_text_gray hover:text-button_red_BG' onClick={click}>Delete chat</div>
            </div>
          }
        </button>
      </div>
    </>
  )
}