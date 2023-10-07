'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useLocalization } from '../../../../stores/localizationStore'
import styles from "./locale-switcher.module.scss"

export default function LocaleSwitcher(props: any) {
  
  const pathName = usePathname()
  const { data: session, update } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [usrLang, setLang] = useLocalization((state) => [state.localization, state.setLocal])

  const toggleMenu = () => { setIsOpen(!isOpen)};
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className={styles.container} ref={dropdownRef}>
        <button className={styles.dropBtn} onClick={toggleMenu}>
          {props.local}
        </button>
        {isOpen &&
        <div className={isOpen ? styles.dropMenu : styles.dropMenuHidden}>
          <div className={styles.column}>    
            <Link href={redirectedPathName('ua')} locale='ua'>
              <img src="/UA.png" alt="ua" />
            </Link>     
            <Link href={redirectedPathName('en')} locale='en' >
              <img src="/GB.png" alt="en" />
            </Link>
            <Link href={redirectedPathName('de')} locale='de' >
              <img src="/DE.png" alt="de" />
            </Link>
          </div>
          <div className={styles.column}>
            <Link href={redirectedPathName('fr')} locale='fr' >
              <img src="/FR.png" alt="fr" />
            </Link>
            <Link href={redirectedPathName('pl')} locale='pl' >
              <img src="/PL.png" alt="pl" />
            </Link>
          </div>
        </div>
        }
      </div>
    </>
  )
}
