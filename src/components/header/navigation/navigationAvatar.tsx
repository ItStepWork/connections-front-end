import { useStore } from '@/stores/userDataStore';
import Image from 'next/image';
import { FC } from 'react';
import styles from './navigation.module.scss';

export const NavigationAvatar: FC = () => {
  const [avatar] = useStore((state) => [state.avatar])
  return (
    <>
      <div className={styles.avatar}>
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