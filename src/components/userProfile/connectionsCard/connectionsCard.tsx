import { ConnectionsPreloader } from '@/loaders/connectionsPreloader';
import { useEffect, useState } from 'react';
import { ConnectionBlock } from './connectionBlock';
import styles from './connectionsCard.module.scss';

export const ConnectionsCard = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = 1000;
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {

    return <ConnectionsPreloader/>;
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Связи</h2>
        <ConnectionBlock />
        <ConnectionBlock />
        <ConnectionBlock />
        <ConnectionBlock />
        <ConnectionBlock />
        <button className={styles.buttonLoadMore}>Загрузть еще</button>
      </div >
    </>
  )
}