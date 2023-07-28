import { faker } from '@faker-js/faker';
import Link from 'next/link';
import { Card } from './card';
import styles from './groupsCard.module.scss';

export const GroupsCard = () => {



  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.groups}>
            <h2>Сообщества</h2>
            <div className={styles.counter}>{faker.number.int(322)}</div>
          </div>
          <Link href='/' className={styles.button}>Мои</Link>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cards}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  )
}