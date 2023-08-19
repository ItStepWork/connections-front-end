import { useStore } from '@/stores/userDataStore';
import Image from 'next/image';
import { FC } from 'react';
import styles from './navigation.module.scss';

export const NavigationAvatar: FC = () => {
  const [avatar, fetch] = useStore((state) => [state.avatar, state.fetchUser])
  return (
    <>
      <div className={styles.avatar} onLoad={fetch}>
        {
          avatar && 
          <Image
            src={avatar}
            width={40}
            height={40}
            quality={80}
            style={{ objectFit: "contain" }}
            alt="avatar"
          />
        }
      </div>
    </>
  )
}