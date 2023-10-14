"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useStore } from '../../../../../stores/userDataStore';
import { FriendsPreloader } from '../../loaders/friendsPreloader';
import { Card } from './card';
import styles from './friendsCard.module.scss';

export const FriendsCard = (props: any) => {

  const { local } = props;
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
            <h2>{local.friends.title}</h2>
            <div className={styles.counter}>{friendCount}</div>
          </div>
          <Link href='/' className={styles.button}>{local.button.allFriends}</Link>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cards}>
            <Card local={local}/>
            <Card local={local}/>
          </div>
          <div className={styles.cards}>
            <Card local={local}/>
            <Card local={local}/>
          </div>
        </div>
      </div>
    </>
  )
}
