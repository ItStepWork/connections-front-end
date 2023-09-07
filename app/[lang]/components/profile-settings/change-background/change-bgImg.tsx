'use client'
import { RxUpload } from 'react-icons/rx';
import { toast } from 'react-toastify';
import styles from './change-bgImg.module.scss';

const ChangeBgImg = ({local} : {local : any}) => {
  const notifyInfo = () => toast.info("В разработке!",{});
  
  return (
    <>
      <div className={styles.container}>
        <form>
          <div className={styles.dropZoneContainer}>
            <label htmlFor="dropzone-file" className={styles.dropZoneLabel}>
              <div className={styles.dropZoneSVGContainer}>
                <div className={styles.dropZoneSVG}>         
                  <RxUpload size={100}/>
                </div>
                <p className="font-semibold">Клик для загрузки</p>
                <p>или</p>
                <p>перетащите файл сюда</p>
                <p>SVG, PNG, JPG или JPEG</p>
              </div>
              <input id="dropzone-file" type="file" onClick={notifyInfo} accept=".jpg, .jpeg, .png, .svg" required className="hidden" />
            </label>
          </div> 
          <p>Lorem ipsum ptate cupiditate odio accusantium assumenda porro debitis aspernatur!</p>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={notifyInfo} type='submit'>Установить фон</button>
          </div>
        </form>
      </div>
    </>
  )
};

export default ChangeBgImg;
