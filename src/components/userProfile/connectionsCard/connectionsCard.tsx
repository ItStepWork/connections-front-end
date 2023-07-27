import { ConnectionBlock } from './connectionBlock';
import styles from './connectionsCard.module.scss';

export const ConnectionsCard = () => {
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