import ChangeImage from '../change-image/change-image';
import styles from './main.module.scss';

const ChangeImages = (props: any) => {

  const { local } = props;

  return (
    <>
      <div className={styles.container}>
        <h2>{local.settingsImages.title}</h2>
        <p>{local.settingsImages.subtitle}</p>
        <div className={styles.dropzone}>
          <ChangeImage local={local}/>
        </div>
      </div>
    </>
  )
};

export default ChangeImages;