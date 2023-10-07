"use client"

import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { CelebrationService } from '../../../../../services/celebration.service';
import { CreateEvent } from '../createEvent/createEvent';
import CardItem from './cardItem/cardItem';
import styles from './celebration.module.scss';


export default function Celebration(props: any) {

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
    setBirthDaysNow(result)
  }
  const getBirthDaysSoon = async () => {
    let result = await CelebrationService.getBirthdaysSoon()
    setBirthDaysSoon(result)
  }
  const getEvents = async () => {
    let result = await CelebrationService.getEvents()
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
            <div className={styles.headText}>{props.local.events.title}</div>
            <button className={styles.button} onClick={openDialog} >
              <AiOutlinePlus className="dark:fill-blue" size={35}></AiOutlinePlus>
            </button>
          </div>

        </div>
        <div className={styles.contentContainer}>
          <div className={styles.headText}>{props.local.events.today}</div>
          {birthDaysNow && birthDaysNow.map((value: any, key: any) => {
            return (<CardItem key={key} user={props.user} event={value} BirthDayNow={true} local={props.local} />)
          })}
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.headText}>{props.local.events.soon}</div>
          {birthDaysSoon && birthDaysSoon.map((value: any, key: any) => {
            return (<CardItem key={key} user={props.user} event={value} BirthDayNow={false} local={props.local} />)
          })}
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.headText}>{props.local.events.upcoming}</div>
          {events && events.map((value: any, key: any) => {
            return (<CardItem key={key} user={props.user} event={value} local={props.local} />)
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
