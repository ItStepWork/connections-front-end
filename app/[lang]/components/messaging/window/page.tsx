"use client"
import { IoMdClose } from 'react-icons/io';
import styles from './styles.module.scss';

export default function Window(props: any) {

  const {
    name,
    isOpen,
    children,
    setIsOpen
  } = props

  return (
    <div {...isOpen ? { className: styles.container + " visible z-50" } : { className: styles.container + " invisible z-50" }}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{name}</h2>
          <button onClick={() => setIsOpen(false)}>
            <IoMdClose size={26} className={styles.buttonClose} />
          </button>
        </div>
        <hr className={styles.horizontalHr} />
        {children}
      </div>
    </div>
  )
}