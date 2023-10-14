"use client"
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ImagePreloader } from '../../loaders/imagePreloader';
import styles from './photosCard.module.scss';

export default function PhotosCard(props: any) {

  const { local } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    const delay = 1000;
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {

    return <ImagePreloader />;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{local.gallery.photo}</h2>
          <Link href='/' className={styles.button}>{local.button.showAll}</Link>
        </div>
        <div className={styles.photoContainer}>
          <div className={styles.photo}>
            <Image
              src={faker.image.url()}
              width='163'
              height='163'
              style={{ objectFit: "contain" }}
              alt="Picture of the author"
              loading="lazy"
              />
          </div>
          <div className={styles.photo}>
            <Image
              src={faker.image.url()}
              width='163'
              height='163'
              style={{ objectFit: "contain" }}
              alt="Picture of the author"
              loading="lazy"
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
              loading="lazy"
              />
          </div>
          <div className={styles.photo}>
            <Image
              src={faker.image.url()}
              width='163'
              height='163'
              style={{ objectFit: "contain" }}
              alt="Picture of the author"
              loading="lazy"
            />
          </div>
          <div className={styles.photo}>
            <Image
              src={faker.image.url()}
              width='163'
              height='163'
              style={{ objectFit: "contain" }}
              alt="Picture of the author"
              loading="lazy"
              />
          </div>
        </div>
      </div>
    </>
  )
}