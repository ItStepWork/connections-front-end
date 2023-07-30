import { faker } from "@faker-js/faker";
import Image from 'next/image';
import { FC } from "react";
import styles from './connectionBlock.module.scss';

export const ConnectionBlock: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.userContainer}>
          <div className={styles.avatar}>
            <Image
              src={faker.image.avatar()}
              width={48}
              height={48}
              quality={80}
              style={{ objectFit: "contain" }}
              alt="avatar"
            />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.headerText}>
              <span>{faker.person.fullName()}</span>
              <span>{faker.company.name()}</span>
            </div>
            <div className={styles.description}>{faker.music.songName()}</div>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.buttonRed}>Удалить</button>
          <button className={styles.buttonBlue}>Написать</button>
        </div>
      </div>
    </>
  )
}