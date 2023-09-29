'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import MessagingLeftBlock from '../messagingLeftBlock/page';
import MessagingMainBlock from '../messagingMainBlock/page';
import MessagingFooterBlock from '../messagingFooterBlock/page';
import { AdminService } from '../../../../../services/admin.service';
import { TiMessages } from 'react-icons/ti';
import { IoMdClose } from 'react-icons/io';

export default function Messaging(props: any) {

  const [user, setUser] = useState<any>(null);
  const [dialogs, setDialogs] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const click = (value: any) => {
    setIsOpen(false);
    if (value !== user) {
      setUser(value);
      loadMessages(value.id);
    }
  }

  const loadMessages = async (id: string) => {
    const result = await AdminService.getSupportMessages(id);
    setMessages(result)
  }

  const loadDialogs = async () => {
    let result = await AdminService.getSupportDialogs();
    setDialogs(result);
  }

  useEffect(() => {
    loadDialogs();
  }, []);

  return (
    <div className='w-full' style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}>
      <div className="flex m-3 cursor-pointer absolute right-0 mt-[-38px] md:invisible hover:text-button_blue_BG" onClick={() => { setIsOpen(!isOpen) }} >
        <h2 className="text-xl mx-1">Dialogs</h2>
        <TiMessages size={24} />
      </div>
      <div className={styles.centerContainer}>
        <div className={`z-10 absolute h-full md:static transition-all duration-500 ease-in ${isOpen ? 'right-[0px]' : 'right-[-400px]'}`}>
          <div className='h-full m-3 flex flex-col bg-light_background dark:bg-dark_background md:bg-transparent border md:border-0 border-zinc-200 dark:border-zinc-700'>
            <div className='flex w-full justify-end md:invisible md:h-0'>
              <IoMdClose size={36} className=" cursor-pointer rounded-lg fill-gray-500 hover:fill-gray-300" onClick={() => { { setIsOpen(false) } }} />
            </div>
            <MessagingLeftBlock dialogs={dialogs} click={click} user={user} />
          </div>
        </div>
        <hr className={styles.verticalHr} />
        {user ? (
          <div className={styles.rightContainer}>
            <MessagingMainBlock messages={messages} user={user} />
            <hr className={styles.horizontalHr} />
            <MessagingFooterBlock userId={user.id} loadMessages={loadMessages} loadDialogs={loadDialogs} />
          </div>
        ) : (<div className={styles.rightContainer}></div>)}
      </div>
    </div>
  )
}
