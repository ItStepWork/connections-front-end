"use client"
import { useSession } from 'next-auth/react'
import localFont from "next/font/local"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { BiMenu } from 'react-icons/bi'
import { FiLogIn } from 'react-icons/fi'
import { MdAdminPanelSettings, MdOutlineClose, MdOutlineMessage } from 'react-icons/md'
import { ComponentName, Role } from '../../../../enums/all.enum'
import { UserService } from '../../../../services/user.service'
import { useMainComponents } from '../../../../stores/mainStateStore'
import { useStore } from '../../../../stores/userDataStore'
import { DropMenuProfile } from '../userProfile/dropMenu/dropMenu'
import styles from './header.module.scss'
import LocaleSwitcher from './locale-switcher'
import LocalSwitcherMinimal from './locale-switcher-minimal'

const oneDay = localFont({ src: '../../../../fonts/ONEDAY.ttf' })

const channelWorkerBroadcast = new BroadcastChannel('channelWorker');

export const Header = (props: any) => {

  const { 
    local,
    lang
  } = props;

  const [fetch] = useStore((state) => [state.fetchUser])
  const setComponent = useMainComponents((state) => state.setComponent)

  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const load = async () => {
    if (Notification.permission !== "granted") Notification.requestPermission();
    let user = await UserService.getCurrentUser();
    if (session?.user.accessToken !== undefined && user !== null) {
      let token = session.user.accessToken;
      setInterval(() => tick(token), 1000);
    }
  };

  const tick = (token: string) => {
    channelWorkerBroadcast.postMessage({ token: token });
  };

  useEffect(() => {
    load();
  }, [session]);

  return (
    <>
      <header className={styles.header} onLoad={fetch}>
        <div>
          <div className={styles.contentContainer}>
            <Link href={`/${lang}/`} className={styles.logoLink}>
              <span className={styles.logo}><p className={oneDay.className}>Connections</p></span>
            </Link>
            <div className={styles.burgerButton} onClick={() => setOpen(!open)}>{open ? <MdOutlineClose size={24} /> : <BiMenu size={24} />}
            </div>
            <ul className={`md:flex md:items-center pt-6 md:pt-0 lg:pt-0 md:pb-0 pb-12 lg:shadow-none md:shadow-none dark:shadow-customTransparent dark:backdrop-blur-[3px] md:backdrop-blur-0 absolute rounded-lg md:static md:z-auto z-[-10] left-4 w-11/12 md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in bg-light_background md:bg-glass_white lg:bg-glass_white md:border-none lg:border-none border dark:border-dark_border border-light_border md:dark:bg-transparent dark:bg-dark_button_BG ${open ? 'top-14 opacity-100' : 'top-[-500px] md:opacity-100 opacity-0'}`}>
              {session ?
                <>
                  <li className={styles.listItem}>
                    <Link className={styles.navText} onClick={() => setComponent(ComponentName.Posts)} href={`/${lang}/main`}>{local.header.main}</Link>
                  </li>
                  <li className={styles.listItem}>
                    <Link className={styles.navText} onClick={fetch} href={`/${lang}/profile/${session.user.id}`}>{local.header.profile}</Link>
                  </li>
                  <li className={styles.listItem}>
                    <Link className={styles.navText} onClick={fetch} href={`/${lang}/support`}>{local.header.support}</Link>
                  </li>
                  {session.user.role !== Role.User &&
                    <li className={styles.listItem}>
                      <Link className={open ? styles.navText : styles.navButton} onClick={fetch} href={`/${lang}/admin`}>{open ? local.header.admin : <MdAdminPanelSettings size={20} />}</Link>
                    </li>
                  }
                  <li className={styles.listItem}>
                    <Link className={open ? styles.navText : styles.navButton} onClick={fetch} href={`/${lang}/messaging`}>{open ? local.header.dropMenu.messages : <MdOutlineMessage size={20} />}</Link>
                  </li>
                  <li className={styles.listItem}>
                    <Link className={open ? styles.navText : styles.navButton} onClick={fetch} href={`/${lang}/settings`}>{open ? local.header.dropMenu.settings : <AiOutlineSetting size={20} />}</Link>
                  </li>
                  <li className={styles.listItem}>
                    <DropMenuProfile navbarOpen={open} lang={lang} local={local} />
                  </li>
                </>
                :
                <>
                  <li className={styles.listItem}>
                    <Link className={open ? styles.navText : styles.navButton} onClick={fetch} href={`/${lang}/signIn`}>{open ? local.header.login : <FiLogIn size={20} />}</Link>
                  </li>
                </>}
              <li className={styles.listItem}>
                {open ? <LocalSwitcherMinimal /> : <LocaleSwitcher local={lang} />}
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}