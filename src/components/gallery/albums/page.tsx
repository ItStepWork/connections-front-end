import { GalleryService } from '@/services/gallery.service';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import Album from '../album/page';

export default function Albums() {
  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    let result = await GalleryService.getAlbums();
    setAlbums(result);
  }

  return (
    <div className={styles.container}>
      {albums.map((album: any, index) => {
        return (
          <Album key={index} album={album} />
        );
      })}
    </div>
  );
}