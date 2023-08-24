import styles from './styles.module.scss';
import Album from '../album/page';

export default function Albums(props: any) {


  return (
    <div className={styles.container}>
      {props.albums.map((album: any, index: any) => {
        return (
          <Album key={index} album={album} myId={props.myId} userId={props.userId}  get={props.get} />
        );
      })}
    </div>
  );
}