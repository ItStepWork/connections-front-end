"use client"
import { BsCalendarDate, BsEnvelope, BsHeart } from 'react-icons/bs';
import { useStore } from "../../../../../stores/userDataStore";
import styles from './styles.module.scss';


export const AboutCard = (props: any) => {

  const {
    local,
    group,
    members
  } = props;

  const [aboutMe, born, email, familyStatus] =
    useStore((state) => [state.aboutMe, state.born, state.email, state.familyStatus])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{local.groups.aboutGroup.about}</h2>
          <div className={styles.description}>
            <p className="  word-break: break-all"> {group.description ? group.description : local.settings.placeholders.notIndicated}</p>
          </div>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsCalendarDate size={18} />
          </div>
          <p>{local.groups.aboutGroup.people}<span>{members}</span> {local.groups.aboutGroup.members}</p>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsHeart size={18} />
          </div>
          <p>{local.groups.aboutGroup.status} <span>{group.audience === "Private" ? local.createGroup.closed : local.createGroup.open}</span></p>
        </div>
        <div className={styles.iconText}>
          <div className={styles.icon}>
            <BsEnvelope size={18} />
          </div>
          <p>{local.groups.aboutGroup.mail}<span>{group.email ? group.email : local.settings.placeholders.notIndicated}</span></p>
        </div>
      </div>
    </>
  )
}