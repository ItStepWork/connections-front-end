import StoryAlbum from "./story-album/story-album";
import styles from './styles.module.scss';

export default function StoriesAlbums(props: any) {

  return (
    <div className={styles.container}>
      {props.stories && props.stories.map((story: any, index: any) => {
        return (
          <StoryAlbum key={index} story={story} myId={props.myId} userId={props.userId} local={props.local} />
        );
      })}
    </div>
  );
}
