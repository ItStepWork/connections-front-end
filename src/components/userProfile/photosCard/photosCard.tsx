import { faker } from '@faker-js/faker';
import Image from 'next/image';
import Link from 'next/link';
import styles from './photosCard.module.scss';

export const PhotosCard = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Фото</h2>
          <Link href='/' className={styles.button}>Смотреть все</Link>
        </div>
        <div className={styles.photoContainer}>
          <div className={styles.photo}>
            <Image
              src={faker.image.url()}
              width='163'
              height='163'
              style={{ objectFit: "contain" }}
              alt="Picture of the author"
            />
          </div>
          <div className={styles.photo}>
            <Image
              src={faker.image.url()}
              width='163'
              height='163'
              style={{ objectFit: "contain" }}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className={styles.photoContainer2}>
          <div className={styles.photo}>
            <Image
              src={faker.image.url()}
              width='163'
              height='163'
              style={{ objectFit: "contain" }}
              alt="Picture of the author"
            />
          </div>
          <div className={styles.photo}>
            <Image
              src={faker.image.url()}
              width='163'
              height='163'
              style={{ objectFit: "contain" }}
              alt="Picture of the author"
            />
          </div>
          <div className={styles.photo}>
            <Image
              src={faker.image.url()}
              width='163'
              height='163'
              style={{ objectFit: "contain" }}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </>
  )
}