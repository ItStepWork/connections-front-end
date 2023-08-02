import { faker } from '@faker-js/faker';
import Image from 'next/image';
import Link from 'next/link';
import {AiOutlineUsergroupAdd } from 'react-icons/ai';
import styles from './card.module.scss';

export const Card = (props:any) => {



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
          />
        </div>
        <div className={styles.fio}>
          <h4>{props.group.name}</h4>
          <p>{props.group.description}</p>
          <p>{faker.number.int(500)} учасников</p>
        </div>
        <div className={styles.buttons}>
          <Link href='/' className={styles.blueButton} ><AiOutlineUsergroupAdd size={16} /></Link>
        </div>
      </div>
    </>
  )
}