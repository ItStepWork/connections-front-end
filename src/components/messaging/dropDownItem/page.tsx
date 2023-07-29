import styles from './styles.module.scss'
import { FC, useState } from "react";
import Link from 'next/link';

export const DropDownItem: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={() => setIsOpen((prev) => !prev)} onFocus={() => {if(isOpen)setIsOpen(true)}} onBlur={() => setIsOpen(false)} {...isOpen?{className:"rounded-full bg-blue-500"}:{className:"rounded-full bg-blue-100 dark:bg-gray-800"}}>
          <svg {...isOpen?{className:"w-10 h-10 fill-blue-100"}:{className:"w-10 h-10 fill-blue-700"}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -10 4 35">
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
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