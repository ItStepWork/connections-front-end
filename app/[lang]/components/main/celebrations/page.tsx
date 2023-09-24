import { faker } from '@faker-js/faker';
import styles from './celebration.module.scss';
import CardItem from './cardItem/cardItem';
import { useEffect, useState } from 'react';
import { CelebrationService } from '../../../../../services/celebration.service';


export default function Celebration(props: any) {
  // const [birthDaysNow, setBirthDaysNow] = useState<any[]>([])
  // useEffect(() => {
  //   getBirthDaysNow()
  // }, [])
  // const getBirthDaysNow = async () => {
  //   let result = await CelebrationService.getBirthdaysNow(props.session.user.id)
  //   setBirthDaysNow(result)
  // }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <h2>Сегодня празднуют</h2>
          {props.birthDaysNow && props.birthDaysNow.map((value: any, key: any) => {
            return (<CardItem key={key} session={props.session} event={value} BirthDayNow={true} />)
          })}
          {/* <CardItem date='' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='Отправить поздравление' />
          <CardItem date='' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='Отправить поздравление' />
          <CardItem date='' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='Отправить поздравление' />
          <CardItem date='' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='Отправить поздравление' /> */}
        </div>

        <div className={styles.contentContainer}>
          <h2>Скоро празднуют</h2>
          {props.birthDaysSoon && props.birthDaysSoon.map((value: any, key: any) => {
            return (<CardItem key={key} session={props.session} event={value} BirthDayNow={false} />)
          })}
          {/* <CardItem date='12 марта' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='напомнить о событии' />
          <CardItem date='12 марта' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='напомнить о событии' />
          <CardItem date='12 марта' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='напомнить о событии' />
          <CardItem date='12 марта' avatar={faker.image.avatar()} fullName={faker.person.fullName()} howCelebrating='напомнить о событии' /> */}
        </div>
      </div>
    </>
  )
}
