import Album from '../album/page';
import styles from './styles.module.scss';

export default function Albums(props: any) {


  return (
    <div className={styles.container}>
      {props.albums && props.albums.map((album: any, index: any) => {
        return (
          <Album key={index} album={album} myId={props.myId} userId={props.userId}  get={props.get} />
        );
      })}
    </div>
  );
}