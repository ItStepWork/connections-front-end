'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { SupportService } from '../../../../services/support.service';
import FooterBlock from './footerBlock/page';
import MainBlock from './mainBlock/page';

export default function Support({ local, session }: { local: any, session: any }) {

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
      <div className='relative md:absolute container w-full py-0 md:py-20 pt-20 md:mt-0 h-screen min-h-[500px]'>
        {session &&
          <div className={styles.centerContainer}>
            <MainBlock messages={messages} user={session.user} />
            <hr className={styles.horizontalHr} />
            <FooterBlock load={load} local={local}/>
          </div>
        }
      </div>
    </div>
  )
}
