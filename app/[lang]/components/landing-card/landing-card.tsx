import styles from './landing-card.module.scss'

const LandingCard = (props:any) => {

  const {
    path,
    alt,
    text,
    title
  } = props;

  return (
    <>
      <div className={styles.container}>
        <img src={path} alt={alt} />
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </>
  )
};

export default LandingCard;
