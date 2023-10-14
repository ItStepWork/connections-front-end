"use client"
import styles from './styles.module.scss';

export default function OnlineUser(props: any) {

  const {
    user,
    local
  } = props;

  let last = new Date(user.lastVisit) as any;
  let date = new Date() as any;
  let minutes = Number(((date - last) / 60000).toFixed(0));

  let lastDigit = minutes % 10;
  let lastText = local.userActivity.minute;
  if (lastDigit === 0 || lastDigit > 4) lastText = local.userActivity.minutes;
  else if (lastDigit > 1) lastText = local.userActivity.minutes;

  let text = local.userActivity.last + minutes + lastText + local.userActivity.ago;
  if (minutes > 1439) {
    let days = Number((minutes / 1440).toFixed(0));
    lastDigit = days % 10;
    lastText = local.userActivity.day;
    if (lastDigit === 0 || lastDigit > 4) lastText = local.userActivity.days;
    else if (lastDigit > 1) lastText = local.userActivity.days;
    text = local.userActivity.last + days + lastText + local.userActivity.ago;
  }
  else if (minutes > 59) {
    let hours = Number((minutes / 60).toFixed(0));

    lastDigit = hours % 10;
    lastText = local.userActivity.hour;
    if (lastDigit === 0 || lastDigit > 4) lastText = local.userActivity.hours;
    else if (lastDigit > 1) lastText = local.userActivity.hours;
    text = local.userActivity.last + hours + lastText + local.userActivity.ago;
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