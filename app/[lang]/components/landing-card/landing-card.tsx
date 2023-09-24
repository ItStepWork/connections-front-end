import styles from './landing-card.module.scss'

const LandingCard = (props:any) => {
  return (
    <>
      <div className={styles.container}>
        <img src={props.path} alt={props.alt} />
        <h3>{props.title}</h3>
        <p>{props.text}</p>
      </div>
    </>
  )
};

export default LandingCard;
