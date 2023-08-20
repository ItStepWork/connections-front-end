import { Dialogues } from '@/components/messaging/dialogues/page';
import { useState } from "react";
import { ImMenu } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import styles from './styles.module.scss';

export function DropDownDialogues(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button"  {...isOpen ? { className: "bg-button_blue_BG rounded-lg px-3 py-2" } : { className: "bg-button_blue_opacity rounded-lg px-3 py-2" }} onClick={() => { if (!isOpen) setIsOpen(true) }} onFocus={() => { if (isOpen) setIsOpen(true) }} onBlur={() => setIsOpen(false)}>
        <ImMenu {...isOpen ? { className: "fill-white" } : { className: "fill-button_blue_BG" }} />

        {isOpen &&
          <div className={styles.container}>
            <div className='flex w-full justify-end p-2'>
              <IoMdClose size={36} className={styles.buttonClose} onClick={()=>{{setIsOpen(false)}}}/>
            </div>
            <div className={styles.dropMenu}>
              <Dialogues dialogs={props.dialogs} click={props.click} user={props.user} />
            </div>
          </div>
        }
      </button>
    </>
  )
}