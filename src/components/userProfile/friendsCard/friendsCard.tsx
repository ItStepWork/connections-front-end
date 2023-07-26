import { faker } from '@faker-js/faker';
import Link from 'next/link';
import { Card } from './card';
import styles from './friendsCard.module.scss';

export const FriendsCard = () => {



  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.friends}>
            <h2>Друзья</h2>
            <div className={styles.counter}>{faker.number.int(322)}</div>
          </div>
          <Link href='/' className={styles.button}>Все друзья</Link>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cards}>
            <Card />
            <Card />
          </div>
          <div className={styles.cards}>
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  )
}