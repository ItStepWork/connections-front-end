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
              height={250}
              quality={80}
              //style={{ objectFit: "cover" }}
              alt="story"
            />
            <p>{faker.person.fullName()}</p>
          </div>
          <div className={styles.img}>
            <Image
              src={faker.image.url({height: 150, width: 120})}
              width={120}
              height={250}
              quality={80}
              //style={{ objectFit: "cover" }}
              alt="story"
            />
             <p>{faker.person.fullName()}</p>
          </div>
          <div className={styles.img}>
            <Image
              src={faker.image.url({height: 150, width: 120})}
              width={120}
              height={250}
              quality={80}
              //style={{ objectFit: "cover" }}
              alt="story"
            />
             <p>{faker.person.fullName()}</p>
          </div>
          <div className={styles.img}>
            <Image
              src={faker.image.url({height: 150, width: 120})}
              width={120}
              height={250}
              quality={80}
              //style={{ objectFit: "cover" }}
              alt="story"
            />
             <p>{faker.person.fullName()}</p>
          </div>
          <div className={styles.img}>
            <Image
              src={faker.image.url({height: 150, width: 120})}
              width={120}
              height={250}
              quality={80}
              //style={{ objectFit: "cover" }}
              alt="story"
            />
             <p>{faker.person.fullName()}</p>
          </div>
          <div className={styles.img}>
            <Image
              src={faker.image.url({height: 150, width: 120})}
              width={120}
              height={250}
              quality={80}
              //style={{ objectFit: "cover" }}
              alt="story"
            />
             <p>{faker.person.fullName()}</p>
          </div>
        </div>
      </div>
    </>
  )
}