import { faker } from '@faker-js/faker';
import Image from 'next/image';
import { FC } from 'react';
import styles from './navigation.module.scss';
import { useStore } from '@/stores/userDataStore';

export const NavigationAvatar: FC = () => {
  const [avatar] = useStore((state) => [state.avatar])
  return (
    <>
      <div className={styles.avatar}>
        <Image
          src={avatar}
          width={40}
          height={40}
          quality={80}
          style={{ objectFit: "cover" }}
          alt="avatar"
        />
      </div>
    </>
  )
}