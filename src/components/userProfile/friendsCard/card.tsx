import { faker } from '@faker-js/faker';
import Image from 'next/image';
import Link from 'next/link';
import { BsChatLeftText, BsPersonAdd } from 'react-icons/bs';
import styles from './card.module.scss';

export const Card = () => {



  return (
    <>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <Image
            src={faker.image.avatar()}
            width={76}
            height={76}
            alt="Picture of the author"
          />
        </div>
        <div className={styles.fio}>
          <h4>{faker.person.fullName()}</h4>
          <p>{faker.number.int(22)} общих друзей</p>
        </div>
        <div className={styles.buttons}>
          <Link href='/' className={styles.blueButton}><BsChatLeftText size={16} /></Link>
          <Link href='/' className={styles.redButton} ><BsPersonAdd size={16} /></Link>
        </div>
      </div>
    </>
  )
}