import Album from '../album/page';
import styles from './styles.module.scss';

export default function Albums(props: any) {

  const {
    albums,
    local,
    myId,
    userId
  } = props;

  return (
    <div className={styles.container}>
      {albums && albums.map((album: any, index: any) => {
        return (
          <Album 
            key={index} 
            album={album} 
            local={local} 
            myId={myId} 
            userId={userId} 
          />
        );
      })}
    </div>
  );
}