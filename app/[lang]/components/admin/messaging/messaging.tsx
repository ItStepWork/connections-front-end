'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import MessagingLeftBlock from '../messagingLeftBlock/page';
import MessagingMainBlock from '../messagingMainBlock/page';
import MessagingFooterBlock from '../messagingFooterBlock/page';
import { AdminService } from '../../../../../services/admin.service';

export default function Messaging(props: any) {

  const [user, setUser] = useState<any>(null);
  const [dialogs, setDialogs] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  const click = (value: any) => {
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
    <div className={styles.centerContainer}>
      <div className={styles.leftContainer}>
        <div className='m-3 flex justify-between'>
          <MessagingLeftBlock dialogs={dialogs} click={click} user={user} />
        </div>
        <hr className={styles.verticalHr} />
      </div>
      {user ? (
        <div className={styles.rightContainer}>
          <MessagingMainBlock messages={messages} user={user} />
          <hr className={styles.horizontalHr} />
          <MessagingFooterBlock userId={user.id} loadMessages={loadMessages} loadDialogs={loadDialogs} />
        </div>
      ) : (<div className={styles.rightContainer}></div>)}
    </div>
  )
}
