import styles from './styles.module.scss'
import { FC, useState } from "react";
import Link from 'next/link';
import { HiDotsVertical } from 'react-icons/hi'

export const DropDownItem: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={() => setIsOpen((prev) => !prev)} onFocus={() => {if(isOpen)setIsOpen(true)}} onBlur={() => setIsOpen(false)}>
          <HiDotsVertical size={40} {...isOpen?{className:"bg-buttonBlue p-3 rounded-full fill-white"}:{className:"bg-buttonBlueOpacity p-3 rounded-full fill-buttonBlue"}}/>
        </button>
        
        {isOpen &&
          <div className={styles.dropMenu}>
            <Link href='/'>View profile</Link>
            <Link href='/'>Delete chat</Link>
          </div>
        }
      </div>
    </>
  )
}