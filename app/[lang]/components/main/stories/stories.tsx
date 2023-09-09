import { faker } from "@faker-js/faker";
import Image from 'next/image';
import styles from "./stories.module.scss";
export const Stories = () => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <div className={styles.img}>
            <Image
              src={faker.image.url({height: 150, width: 120})}
              width={120}
              height={150}
              loading="lazy"
              style={{ objectFit: "cover" }}
              alt="story"
            />
            <p>{faker.person.fullName()}</p>
          </div>
          <div className={styles.img}>
            <Image
              src={faker.image.url({height: 150, width: 120})}
              width={120}
              height={150}
              loading="lazy"
              style={{ objectFit: "cover" }}
              alt="story"
            />
             <p>{faker.person.fullName()}</p>
          </div>
          <div className={styles.img}>
            <Image
              src={faker.image.url({height: 150, width: 120})}
              width={120}
              height={150}
              loading="lazy"
              style={{ objectFit: "cover" }}
              alt="story"
            />
             <p>{faker.person.fullName()}</p>
          </div>
          <div className={styles.img}>
            <Image
              src={faker.image.url({height: 150, width: 120})}
              width={120}
              height={150}
              loading="lazy"
              style={{ objectFit: "cover" }}
              alt="story"  
            />
             <p>{faker.person.fullName()}</p>
          </div>
          <div className={styles.img}>
            <Image
              src={faker.image.url({height: 150, width: 120})}
              width={120}
              height={150}
              loading="lazy"
              style={{ objectFit: "cover" }}
              alt="story"
            />
             <p>{faker.person.fullName()}</p>
          </div>
          <div className={styles.img}>
            <Image
              src={faker.image.url({height: 150, width: 150})}
              width={120}
              height={150}
              loading="lazy"
              style={{ objectFit: "cover" }}
              alt="story"
            />
             <p>{faker.person.fullName()}</p>
          </div>
        </div>
      </div>
    </>
  )
}