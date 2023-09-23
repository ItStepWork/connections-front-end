"use client"
import styles from './styles.module.scss';

export default function OnlineUser(props: any) {

  let last = new Date(props.user.lastVisit) as any;
  let date = new Date() as any;
  let minutes = Number(((date - last) / 60000).toFixed(0));

  let lastDigit = minutes % 10;
  let lastText = props.local.userActivity.minute;
  if (lastDigit === 0 || lastDigit > 4) lastText = props.local.userActivity.minutes;
  else if (lastDigit > 1) lastText = props.local.userActivity.minutes;

  let text = props.local.userActivity.last + minutes + lastText + props.local.userActivity.ago;
  if (minutes > 1439) {
    let days = Number((minutes / 1440).toFixed(0));
    lastDigit = days % 10;
    lastText = props.local.userActivity.day;
    if (lastDigit === 0 || lastDigit > 4) lastText = props.local.userActivity.days;
    else if (lastDigit > 1) lastText = props.local.userActivity.days;
    text = props.local.userActivity.last + days + lastText + props.local.userActivity.ago;
  }
  else if (minutes > 59) {
    let hours = Number((minutes / 60).toFixed(0));

    lastDigit = hours % 10;
    lastText = props.local.userActivity.hour;
    if (lastDigit === 0 || lastDigit > 4) lastText = props.local.userActivity.hours;
    else if (lastDigit > 1) lastText = props.local.userActivity.hours;
    text = props.local.userActivity.last + hours + lastText + props.local.userActivity.ago;
  }

  return (
    <>
      <div>
        {minutes < 5
          ? (<div className={styles.container}><div className={styles.statusDiv + " bg-green-500"} /><span >Online</span></div>)
          : (<div className={styles.container}><div className={styles.statusDiv + " bg-red-500"} /><span >{text}</span></div>)
        }
      </div>
    </>
  )
}