"use client"
import { FaUserCircle } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
// import DropDownItem from '../dropDownItem/page';
import styles from './styles.module.scss';

export default function OnlineUser(props: any) {

  let last = new Date(props.user.lastVisit) as any;
  let date = new Date() as any;
  let minutes = Number(((date - last) / 60000).toFixed(0));

  let lastDigit = minutes % 10;
  let lastText = "минута";
  if (lastDigit === 0 || lastDigit > 4) lastText = "минут";
  else if (lastDigit > 1) lastText = "минуты";

  let text = `Последняя активность ${minutes} ${lastText} назад`;
  if (minutes > 1439) {
    let days = Number((minutes / 1440).toFixed(0));
    lastDigit = days % 10;
    lastText = "день";
    if (lastDigit === 0 || lastDigit > 4) lastText = "дней";
    else if (lastDigit > 1) lastText = "дня";
    text = `Последняя активность ${days} ${lastText} назад`;
  }
  else if (minutes > 59) {
    let hours = Number((minutes / 60).toFixed(0));

    lastDigit = hours % 10;
    lastText = "час";
    if (lastDigit === 0 || lastDigit > 4) lastText = "часов";
    else if (lastDigit > 1) lastText = "часа";
    text = `Последняя активность ${hours} ${lastText} назад`;
  }

  return (
    <>
      <div>
        {minutes < 5 ?
          (<div className={styles.container}><div className={styles.statusDiv + " bg-green-500"} /><span >Online</span></div>)
          :
          (<div className={styles.container}><div className={styles.statusDiv + " bg-red-500"} /><span >{text}</span></div>)
        }
      </div>
    </>
  )
}