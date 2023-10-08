import StoryAlbum from "./story-album/story-album";
import styles from './styles.module.scss';

export default function StoriesAlbums(props: any) {

  const {
    stories,
    local,
    myId,
    userId
  } = props;

  return (
    <div className={styles.container}>
      {stories && stories.map((story: any, index: any) => {
        return (
          <StoryAlbum 
            key={index} 
            story={story} 
            myId={myId} 
            userId={userId} 
            local={local} />
        );
      })}
    </div>
  );
}
