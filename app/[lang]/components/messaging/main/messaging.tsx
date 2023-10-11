'use client'

import { useEffect, useState } from 'react';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { IUser } from '../../../../../dto/sessionDto';
import { MessagingService } from '../../../../../services/messaging.service';
import { SubscriptionService } from '../../../../../services/subscription.service';
import { UserService } from '../../../../../services/user.service';
import Dialogues from '../dialogues/page';
import DropDownDialogues from '../dropDownDialogues/page';
import FooterBlock from '../footerBlock/page';
import HeaderBlock from '../headerBlock/page';
import MainBlock from '../mainBlock/page';
import NewMessage from '../newMessage/page';
import Window from '../window/page';
import styles from './styles.module.scss';

export default function Messaging({ local, session }: { local: any, session: any }) {

  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [dialogs, setDialogs] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isOpenDialogs, setIsOpenDialogs] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const click = (value: IUser) => {
    if (value !== user) {
      const u = value;
      setUser(value);
      loadMessages(value.id);
      if (isOpenDialogs) setIsOpenDialogs(false);
    }
  }

  const loadMessages = async (id: string) => {
    const result = await MessagingService.getMessages(id);
    setMessages(result)
  }

  const removeDialog = async (id: string) => {
    await MessagingService.removeDialog(id);
    loadDialogs();
    setMessages([]);
    setUser(null);
  }

  const loadDialogs = async () => {
    let result = await MessagingService.getDialogs();
    setDialogs(result);
  }

  const loadUsers = async () => {
    let result = await UserService.getUsers();
    setUsers(result);
  }

  useEffect(() => {
    loadDialogs();
    loadUsers();
    return SubscriptionService.subscribeToChannel(session.user.accessToken, `Subscription/SubscribeToMessagesUpdates`, ()=>{
      loadDialogs();
      if (user !== null) {
        loadMessages(user.id);
      }
    });
  }, [user]);

  return (
    <div className={styles.container}>
      <div className='z-50 absolute flex mt-16 lg:invisible'>
        <DropDownDialogues dialogs={dialogs} click={click} user={user} isOpen={isOpenDialogs} setIsOpen={setIsOpenDialogs} /><h2 className='my-1 mx-2'>{local.chat.title}</h2>
      </div>
      <div className='relative md:absolute py-0 container lg:py-20 md:py-28 pt-28 md:mt-0 h-screen min-h-[500px]'>
        <div className={styles.centerContainer}>
          <div className={styles.leftContainer}>
            <div className='m-3 flex justify-between items-center'>
              <h2>{local.chat.activeChat}<span className={styles.chats}>{dialogs.length}</span></h2>
              <button {...isOpen ? { className: styles.buttonOpen } : { className: styles.buttonClose }} onClick={() => setIsOpen(true)}>
                <HiMiniPencilSquare />
              </button>
              <Window name={local.chat.new} isOpen={isOpen} setIsOpen={setIsOpen}>
                <NewMessage users={users} local={local} />
              </Window>
            </div>
            <hr className={styles.horizontalHr} />
            <div className='invisible h-0 lg:visible lg:h-auto overflow-y-auto'>
              <Dialogues dialogs={dialogs} click={click} user={user} />
            </div>
          </div>
          <hr className={styles.verticalHr} />
          {user ? (
            <div className={styles.rightContainer}>
              <HeaderBlock user={user} removeDialog={removeDialog} local={local} />
              <MainBlock messages={messages} user={user} />
              <hr className={styles.horizontalHr} />
              <FooterBlock friendId={user.id} local={local}/>
            </div>
          ) : (<div className={styles.rightContainer}></div>)}
        </div>
      </div>

    </div>
  )
}
