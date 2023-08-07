"use client"
import { useStore } from '@/stores/userDataStore';
import Link from 'next/link';
import { Card } from './card';
import styles from './friendsCard.module.scss';
import { FriendsPreloader } from '@/loaders/friendsPreloader';
import { useEffect, useState } from 'react';

export const FriendsCard = () => {

  const friendCount = useStore((state) => state.friendsCount);

  const [aboutMe, born, email, familyStatus] = 
  useStore((state) => [state.aboutMe, state.born, state.email, state.familyStatus])

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = 1000;
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {

    return <FriendsPreloader />;
  }

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
