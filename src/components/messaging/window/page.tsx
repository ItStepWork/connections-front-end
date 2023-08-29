import { IoMdClose } from 'react-icons/io';
import styles from './styles.module.scss';
import { SendNotification } from '@/services/notification.service';

export function Window(props: any) {

  return (
    <div {...props.isOpen ? { className: styles.container + " visible z-50" } : { className: styles.container + " invisible z-50" }}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{props.name}</h2>
          <button onClick={() => {props.setIsOpen(false); SendNotification('Task added !!!');}}>
            <IoMdClose size={26} className={styles.buttonClose} />
          </button>
        </div>
        <hr className={styles.horizontalHr} />
        {props.children}
      </div>
    </div>
  )
}