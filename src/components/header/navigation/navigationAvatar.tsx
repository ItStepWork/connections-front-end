import { faker } from '@faker-js/faker';
import Image from 'next/image';
import { FC } from 'react';
import styles from './navigation.module.scss';

export const NavigationAvatar: FC = () => {
  return (
    <>
      <div className={styles.avatar}>
        <Image
          src={faker.image.avatar()}
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