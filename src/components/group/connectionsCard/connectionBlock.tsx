import { faker } from "@faker-js/faker";
import styles from './connectionBlock.module.scss';
import { GroupService } from "@/services/group.service";
import Link from "next/link";

export const ConnectionBlock = (props: any) => {
  let ifAdmin = () => {
    if (props.group.adminId === props.session?.user?.id) return true;
    else return false;
  };
  let removeUserFromGroup = async () => {
    let result = await GroupService.removeUserFromGroup(props.group.id, props.user.id);
    alert(result);
    props.getUsers();
    props.getGroup();
  }
  let acceptUserToGroup = async () => {
    let result = await GroupService.acceptUserToGroup(props.group.id, props.user.id);
    alert(result);
    props.getUsers();
    props.getGroup();
  }
  return (
    <>
      <div className={styles.container}>
        <Link href={"/profile/" + props.user.id} className={styles.userContainer}>
          <div className={styles.avatar}>
            <img src={props.user.avatarUrl} alt="avatar" loading="lazy" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.headerText}>
              <span>{props.user.firstName} {props.user.lastName}</span>
              <span>{faker.music.songName()}</span>
            </div>
            <div className={styles.description}>{props.user.aboutMe}</div>
          </div>
        </Link>
        {props.isRequests
          ? <div className={styles.buttonsContainer}>
            <button className={styles.button_red_BG} onClick={() => removeUserFromGroup()}>Удалить</button>
            <button className={styles.button_blue_BG} onClick={() => acceptUserToGroup()}>Принять</button>
          </div>
          : (props.user.id !== props.session?.user?.id)
          && <div className={styles.buttonsContainer}>
            {ifAdmin()
              ? <button className={styles.button_red_BG} onClick={() => removeUserFromGroup()}>Удалить</button>
              : <></>
            }
            <button className={styles.button_blue_BG} onClick={() => { props.setUser(props.user); props.setIsOpen(true); }}>Написать</button>
          </div>
        }
      </div>
    </>
  )
}