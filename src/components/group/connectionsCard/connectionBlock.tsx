import { faker } from "@faker-js/faker";
import styles from './connectionBlock.module.scss';
import { GroupService } from "@/services/group.service";

export const ConnectionBlock = (props: any) => {
  let IfAdmin = () => {
    if (props.group.adminId === props.session?.user?.id) return true;
    else return false;
  };
  let RemoveUserFromGroup = async () => {
    let result = await GroupService.removeUserFromGroup(props.group.id, props.user.id);
    alert(result);
    props.GetUsers();
    props.GetGroup();
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.userContainer}>
          <div className={styles.avatar}>
            <img src={props.user.avatarUrl} alt="avatar" loading="lazy" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.headerText}>
              <span>{props.user.firstName} {props.user.lastName}</span>
              <span>{faker.company.name()}</span>
            </div>
            <div className={styles.description}>{faker.music.songName()}</div>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          {IfAdmin()
            ? <button className={styles.button_red_BG} onClick={() => RemoveUserFromGroup()}>Удалить</button>
            : <></>
          }
          <button className={styles.button_blue_BG}>Написать</button>
        </div>
      </div>
    </>
  )
}