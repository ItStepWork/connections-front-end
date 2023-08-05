import styles from "./stories.module.scss"
import { faker } from "@faker-js/faker"
import Image from 'next/image';
export const Stories = () => {

  return (
    <>
      <div className={styles.container}>
      <div className={styles.img}>
        <Image
          src={faker.image.url()}
          width={120}
          height={150}
          quality={80}
          style={{ objectFit: "cover" }}
          alt="story"
        />
      </div>
      <div className={styles.img}>
        <Image
          src={faker.image.url()}
          width={120}
          height={150}
          quality={80}
          style={{ objectFit: "contain" }}
          alt="story"
        />
      </div>
      <div className={styles.img}>
        <Image
          src={faker.image.url()}
          width={120}
          height={150}
          quality={80}
          style={{ objectFit: "contain" }}
          alt="story"
        />
      </div>
      <div className={styles.img}>
        <Image
          src={faker.image.url()}
          width={120}
          height={150}
          quality={80}
          style={{ objectFit: "cover" }}
          alt="story"
        />
      </div>
      <div className={styles.img}>
        <Image
          src={faker.image.url()}
          width={120}
          height={150}
          quality={80}
          style={{ objectFit: "contain" }}
          alt="story"
        />
      </div>
      <div className={styles.img}>
        <Image
          src={faker.image.url()}
          width={120}
          height={150}
          quality={80}
          style={{ objectFit: "contain" }}
          alt="story"
        />
      </div>
      </div>
    </>
  )
}