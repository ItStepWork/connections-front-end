import { faker } from '@faker-js/faker';
import Image from 'next/image';
import Link from 'next/link';
import { BsChatLeftText, BsPersonAdd } from 'react-icons/bs';
import styles from './card.module.scss';

export const Card = (props: any) => {

  const { local } = props;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <Image
            src={faker.image.avatar()}
            width={76}
            height={76}
            style={{ objectFit: "contain" }}
            alt="Picture of the author"
            loading="lazy"
          />
        </div>
        <div className={styles.fio}>
          <h4>{faker.person.fullName()}</h4>
          <p>{faker.number.int(22)} {local.friends.subtitle}</p>
        </div>
        <div className={styles.buttons}>
          <Link href='/' className={styles.blueButton}><BsChatLeftText size={16} /></Link>
          <Link href='/' className={styles.redButton} ><BsPersonAdd size={16} /></Link>
        </div>
      </div>
    </>
  )
}