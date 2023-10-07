import Link from "next/link";
import { FC } from "react";
import styles from './news-card.module.scss';

type NewsType = {
  header: string;
  url: string;
  text: string;
  webUrl: string;
  local: any;
  category: string;
  source: string
}

const NewsCard:FC<NewsType> = ({header, url, text, webUrl, local, category, source}) => {
  return (
    <>
      <div className={styles.container}>
        <h3>{header}</h3>
        <img src={`https://static01.nyt.com/${url}`} alt="img" />
        <p>{text}</p>
        <p>Media: {source}</p>
        <div className={styles.footer}>
          <Link className={styles.link} href={webUrl}>{local.source}</Link>
          <p>#{category}</p>
        </div>
      </div>
    </>
  )
};

export default NewsCard;

