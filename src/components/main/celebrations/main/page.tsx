import { faker } from '@faker-js/faker';
import { BsTrash } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdOutlineNotificationsOff } from 'react-icons/md';
import CardItem from '../cardItem.tsx/cardItem';
import styles from './celebration.module.scss';

const Celebration = () => {
 return (
  <>
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h2>Сегодня празднуют</h2>
        <CardItem date='' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='Отправить поздравление'/>
        <CardItem date='' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='Отправить поздравление'/>
        <CardItem date='' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='Отправить поздравление'/>
        <CardItem date='' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='Отправить поздравление'/>
      </div>
     
      <div className={styles.contentContainer}>
        <h2>Скоро празднуют</h2>
          <CardItem date='12 марта' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='напомнить о событии'/>     
          <CardItem date='12 марта' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='напомнить о событии'/>     
          <CardItem date='12 марта' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='напомнить о событии'/>     
          <CardItem date='12 марта' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='напомнить о событии'/>     
      </div>
    </div>
  </>
 )
}

export default Celebration;