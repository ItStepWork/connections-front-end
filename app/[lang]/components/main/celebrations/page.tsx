import { faker } from '@faker-js/faker';
import styles from './celebration.module.scss';
import CardItem from './cardItem/cardItem';
import { useEffect, useState } from 'react';
import { CelebrationService } from '../../../../../services/celebration.service';
import { AiOutlinePlus } from 'react-icons/ai';
import { CreateEvent } from '../createEvent/createEvent';


export default function Celebration(props: any) {
  // const [birthDaysNow, setBirthDaysNow] = useState<any[]>([])
  // useEffect(() => {
  //   getBirthDaysNow()
  // }, [])
  // const getBirthDaysNow = async () => {
  //   let result = await CelebrationService.getBirthdaysNow(props.session.user.id)
  //   setBirthDaysNow(result)
  // }
  const [birthDaysNow, setBirthDaysNow] = useState<any[]>([])
  const [birthDaysSoon, setBirthDaysSoon] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  useEffect(() => {
    getBirthDaysNow()
    getBirthDaysSoon()
    getEvents()
  }, [])
  const getBirthDaysNow = async () => {
    let result = await CelebrationService.getBirthdaysNow()
    // console.log(result)
    setBirthDaysNow(result)
  }
  const getBirthDaysSoon = async () => {
    let result = await CelebrationService.getBirthdaysSoon()
    // console.log(result)
    setBirthDaysSoon(result)
  }
  const getEvents = async () => {
    let result = await CelebrationService.getEvents()
    console.log(result)
    setEvents(result)
  }
  const openDialog = () => {
    var dialog: any = document.getElementById("postDialog")
    dialog?.showModal();
  }
  return (
    <>
      <div className={styles.container}>

        <div className={styles.contentContainer}>
          <div className={styles.headContainer}>
            <h2>Events And Celebrations</h2>
            <button className={styles.button} onClick={openDialog} >
              <AiOutlinePlus className="dark:fill-blue" size={35}></AiOutlinePlus>
            </button>
          </div>

        </div>
        <div className={styles.contentContainer}>
          <h2>Сьогодні Святкують</h2>
          {birthDaysNow && birthDaysNow.map((value: any, key: any) => {
            return (<CardItem key={key} user={props.user} event={value} BirthDayNow={true} />)
          })}
        </div>

        <div className={styles.contentContainer}>
          <h2>Скоро Святкують</h2>
          {birthDaysSoon && birthDaysSoon.map((value: any, key: any) => {
            return (<CardItem key={key} user={props.user} event={value} BirthDayNow={false} />)
          })}
        </div>
        <div className={styles.contentContainer}>
          <h2>Найближчі Заходи</h2>
          {events && events.map((value: any, key: any) => {
            return (<CardItem key={key} user={props.user} event={value} />)
          })

          }
        </div>
        <dialog className={styles.dialog} id='postDialog'>
          {<CreateEvent user={props.user} local={props.local}></CreateEvent>}
        </dialog>
      </div>

    </>
  )
}
