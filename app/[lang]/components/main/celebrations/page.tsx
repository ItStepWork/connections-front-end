"use client"

import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { CelebrationService } from '../../../../../services/celebration.service';
import { CreateEvent } from '../createEvent/createEvent';
import CardItem from './cardItem/cardItem';
import styles from './celebration.module.scss';


export default function Celebration(props: any) {

  const {
    local,
    user,
    lang
  } = props;

  const [birthDaysNow, setBirthDaysNow] = useState<any[]>([]);
  const [birthDaysSoon, setBirthDaysSoon] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getBirthDaysNow();
    getBirthDaysSoon();
    getEvents();
  }, [])

  const getBirthDaysNow = async () => {
    let result = await CelebrationService.getBirthdaysNow();
    setBirthDaysNow(result);
  }
  const getBirthDaysSoon = async () => {
    let result = await CelebrationService.getBirthdaysSoon();
    setBirthDaysSoon(result);
  }
  const getEvents = async () => {
    let result = await CelebrationService.getEvents();
    setEvents(result);
  }
  const openDialog = () => {
    var dialog: any = document.getElementById("postDialog");
    dialog?.showModal();
  }
  return (
    <>
      <div className={styles.container}>

        <div className={styles.contentContainer}>
          <div className={styles.headContainer}>
            <h2>{local.events.title}</h2>
            <button className={styles.button} onClick={openDialog} >
              <AiOutlinePlus className="dark:fill-blue" size={35}></AiOutlinePlus>
            </button>
          </div>

        </div>
        {birthDaysNow.length > 0 &&
          <div className={styles.contentContainer}>
            <h2>{local.events.today}</h2>
            {birthDaysNow && birthDaysNow.map((value: any, key: any) => {
              return (
                <CardItem
                  key={key}
                  user={user}
                  event={value}
                  BirthDayNow={true}
                  local={local}
                  lang={lang}
                />)
            })}
          </div>
        }

        {birthDaysSoon.length > 0 &&
          <div className={styles.contentContainer}>
            <h2>{local.events.soon}</h2>
            {birthDaysSoon && birthDaysSoon.map((value: any, key: any) => {
              return (
                <CardItem
                  key={key}
                  user={user}
                  event={value}
                  BirthDayNow={false}
                  local={local}
                  lang={lang}
                />)
            })}
          </div>
        }
        {events.length > 0 &&
          <div className={styles.contentContainer}>
            <h2>{local.events.upcoming}</h2>
            {events && events.map((value: any, key: any) => {
              return (
                <CardItem
                  key={key}
                  user={user}
                  event={value}
                  local={local}
                  lang={lang}
                />)
            })
            }
          </div>
        }

        <dialog className={styles.dialog} id='postDialog'>
          {<CreateEvent user={user} getEvents={getEvents} local={local}></CreateEvent>}
        </dialog>
      </div>

    </>
  )
}
