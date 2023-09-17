'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { IUser } from '../../../../../dto/sessionDto';
import { MessagingService } from '../../../../../services/messaging.service';
import { UserService } from '../../../../../services/user.service';
import Dialogues from '../dialogues/page';
import DropDownDialogues from '../dropDownDialogues/page';
import FooterBlock from '../footerBlock/page';
import HeaderBlock from '../headerBlock/page';
import MainBlock from '../mainBlock/page';
import NewMessage from '../newMessage/page';
import Window from '../window/page';
import styles from './styles.module.scss';

export default function Messaging({ local, session }: { local: any, session: any }, props: any) {

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
    let socket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToMessagesUpdates`, ["client", session.user.accessToken]);
    socket.addEventListener('message', (event) => {
      loadDialogs();
      if (user !== null) {
        loadMessages(user.id);
      }
    });
    let intervalId = setInterval(() => {
      if (socket.OPEN) socket.send("ping");
      else clearInterval(intervalId);
    }, 30000);
    return () => {
      setInterval(() => { if (socket.OPEN) socket.close(); }, 1000)
      clearInterval(intervalId);
    };
  }, [user]);

  return (
    <div className={styles.container}>
      <div className='absolute flex mt-16 lg:invisible'>
        <DropDownDialogues dialogs={dialogs} click={click} user={user} isOpen={isOpenDialogs} setIsOpen={setIsOpenDialogs} /><h2 className='my-1 mx-2'>Чаты</h2>
      </div>
      <div className={styles.centerContainer}>
        <div className={styles.leftContainer}>
          <div className='m-3 flex justify-between items-center'>
            <h2>Активные чаты <span className={styles.chats}>{dialogs.length}</span></h2>
            <button {...isOpen ? { className: styles.buttonOpen } : { className: styles.buttonClose }} onClick={() => setIsOpen(true)}>
              <HiMiniPencilSquare />
            </button>
            <Window name="Новое сообщение" isOpen={isOpen} setIsOpen={setIsOpen}>
              <NewMessage users={users} />
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
            <HeaderBlock user={user} removeDialog={removeDialog} />
            <MainBlock messages={messages} user={user} />
            <hr className={styles.horizontalHr} />
            <FooterBlock friendId={user.id} />
          </div>
        ) : (<div className={styles.rightContainer}></div>)}
      </div>
    </div>
  )
}
