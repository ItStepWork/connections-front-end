"use client"
import Link from 'next/link';
import { Card } from './card';
import styles from './friendsCard.module.scss';
import { useStore } from '@/stores/userDataStore';

export const FriendsCard = () => {

  const friendCount = useStore((state) => state.friendsCount);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.friends}>
            <h2>Друзья</h2>
            <div className={styles.counter}>{friendCount}</div>
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