import { Dialogues } from '@/components/messaging/dialogues/page';
import { ImMenu } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import styles from './styles.module.scss';

export function DropDownDialogues(props: any) {

  return (
    <>
      <button type="button"  {...props.isOpen ? { className: "bg-button_blue_BG rounded-lg px-3 py-2" } : { className: "bg-button_blue_opacity rounded-lg px-3 py-2" }} onClick={() => { if (!props.isOpen) props.setIsOpen(true) }} onFocus={() => { if (props.isOpen) props.setIsOpen(true) }} onBlur={() => props.setIsOpen(false)}>
        <ImMenu {...props.isOpen ? { className: "fill-white" } : { className: "fill-button_blue_BG" }} />

        {props.isOpen &&
          <div className={styles.container}>
            <div className='flex w-full justify-end p-2'>
              <IoMdClose size={36} className={styles.buttonClose} onClick={()=>{{props.setIsOpen(false)}}}/>
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