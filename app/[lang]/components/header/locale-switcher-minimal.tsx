import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useLocalization } from '../../../../stores/localizationStore';
import styles from "./locale-switcher-minimal.module.scss";
const LocalSwitcherMinimal = () => {

  const pathName = usePathname()
  const setLang = useLocalization((state) => state.setLocal)
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  return (
    <>
      <div className={styles.container}>
        <Link href={redirectedPathName('ua')} onClick={() => setLang('ua')} locale={'ua'}>
          <img src="/UA.png" alt="ua" />
        </Link>     
        <Link href={redirectedPathName('en')} onClick={() => setLang('en')} locale={'en'} >
          <img src="/GB.png" alt="en" />
        </Link>
        <Link href={redirectedPathName('de')} onClick={() => setLang('de')} locale={'de'} >
          <img src="/DE.png" alt="de" />
        </Link>
        <Link href={redirectedPathName('fr')} onClick={() => setLang('fr')} locale={'fr'} >
          <img src="/FR.png" alt="fr" />
        </Link>
        <Link href={redirectedPathName('pl')} onClick={() => setLang('pl')} locale={'pl'} >
          <img src="/PL.png" alt="pl" />
        </Link>
      </div>
    </>
  )
};

export default LocalSwitcherMinimal;
