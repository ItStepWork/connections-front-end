import styles from './styles.module.scss'
import { useState } from "react";
import { HiDotsVertical } from 'react-icons/hi'

export function DropDownItem(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const click = () =>{
    props.removeDialog(props.id);
  }

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={() => setIsOpen((prev) => !prev)} onFocus={() => {if(isOpen)setIsOpen(true)}} onBlur={() => setIsOpen(false)}>
          <HiDotsVertical size={40} {...isOpen?{className:"bg-buttonBlue p-3 rounded-full fill-white"}:{className:"bg-buttonBlueOpacity p-3 rounded-full fill-buttonBlue"}}/>
          
          {isOpen &&
            <div className={styles.dropMenu}>
              <div className='text-componentText hover:text-buttonBlue'>View profile</div>
              <div className='text-componentText hover:text-buttonRed' onClick={click}>Delete chat</div>
            </div>
          }
        </button>
      </div>
    </>
  )
}