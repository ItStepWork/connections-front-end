import { faker } from '@faker-js/faker';
import Image from 'next/image';
import { FC } from 'react';
import styles from './navigation.module.scss';

export const NavigationAvatarButton: FC = () => {
  return (
    <>
      <div className={styles.avatar}>
        <Image
          src={faker.image.avatar()}
          width={40}
          height={40}
          quality={80}
          objectFit='cover'
          alt="avatar"
        />
      </div>
    </>
  )
}