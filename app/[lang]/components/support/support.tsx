'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import MainBlock from '../messaging/mainBlock/page';
import { SupportService } from '../../../../services/support.service';
import FooterBlock from './footerBlock/page';

export default function Support({ local, session }: { local: any, session: any }, props: any) {

  const [messages, setMessages] = useState<any[]>([]);

  const load = async () => {
    const result = await SupportService.getMessages();
    setMessages(result)
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className={styles.container}>
      {session &&
        <div className={styles.centerContainer}>
          <MainBlock messages={messages} user={session.user} />
          <hr className={styles.horizontalHr} />
          <FooterBlock load={load} />
        </div>
      }
    </div>
  )
}
