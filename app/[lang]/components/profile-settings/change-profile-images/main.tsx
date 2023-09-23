
import ChangeImage from '../change-image/change-image';
import styles from './main.module.scss';

const ChangeImages = (props: any) => {
  return (
    <>
      <div className={styles.container}>
        <h2>{props.local.settingsImages.title}</h2>
        <p>{props.local.settingsImages.subtitle}</p>
        <div className={styles.dropzone}>
          <ChangeImage local={props.local}/>
        </div>
      </div>
    </>
  )
};

export default ChangeImages;