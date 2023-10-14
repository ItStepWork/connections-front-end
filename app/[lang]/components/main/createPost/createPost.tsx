import { faker } from '@faker-js/faker';
import { useSession } from "next-auth/react";
import { AiOutlineClose } from 'react-icons/ai';
import { BsCalendar2EventFill, BsCameraReelsFill, BsFillCameraVideoFill, BsFillEmojiSmileFill } from 'react-icons/bs';
import { HiPhoto } from 'react-icons/hi2';
import { MdLocalOffer, MdLocationPin } from 'react-icons/md';
import styles from "./styles.module.scss";

export const CreatePost = (props: any) => {

  const {
    local,
    user
  } = props;

  const closeDialog = () => {
    //  document.querySelector("dialog")?.close();
    var dialog: any = document.getElementById("postDialog")
    dialog?.close();
  }
  const { data: session, update } = useSession();
  const options = [
    {
      label: local.posts.postActivity.forAll,
      value: '0',
    },
    {
      label: local.posts.postActivity.forMe,
      value: '1',
    },
    {
      label: local.posts.postActivity.forFriends,
      value: '2',
    },
  ];
  return (
    <>
      <form className={styles.dialogDiv} >
        <div className={styles.dialogDivHeader}>
          <h2 className={styles.labels}>{local.posts.postActivity.title}</h2>
          <button type="button" className={styles.closeButton} onClick={closeDialog}>
            <AiOutlineClose size={16}></AiOutlineClose>
          </button>
        </div>
        <div className={styles.dialogDivBody}>
          <div className="m-1 w-full">
            <div className={styles.topDiv}>
              {user?.avatarUrl
                ? <img className={styles.userIco} src={user.avatarUrl}></img>
                : <img className={styles.userIco} src={faker.image.avatar()}></img>
              }
              <textarea className={styles.grInput} rows={2} placeholder={local.posts.placeholder} required></textarea>
            </div>
          </div>
          <div className={styles.bottomDiv}>
            <div className={styles.roundedDiv + " bg-green-900 "}>
              <HiPhoto size={16} title={local.posts.tooltip.photo} className="fill-green-500"></HiPhoto>
            </div>
            <div className={styles.roundedDiv + " bg-blue-900 "}>
              <BsCameraReelsFill title={local.posts.tooltip.video} size={16} className="fill-blue-500"></BsCameraReelsFill>
            </div>
            <div className={styles.roundedDiv + " bg-red-900 "}>
              <BsCalendar2EventFill title={local.posts.tooltip.event} size={16} className="fill-red-500"></BsCalendar2EventFill>
            </div>
            <div className={styles.roundedDiv + " bg-yellow-900 "}>
              <BsFillEmojiSmileFill title={local.posts.tooltip.activity} size={16} className="fill-yellow-500"></BsFillEmojiSmileFill>
            </div>
            <div className={styles.roundedDiv + " bg-green-900 "}>
              <MdLocationPin title={local.posts.tooltip.location} className="fill-gray-500" size={16}></MdLocationPin>
            </div>
            <div className={styles.roundedDiv + " bg-blue-900 "}>
              <MdLocalOffer title={local.posts.tooltip.tag} className="fill-blue-500" size={16}></MdLocalOffer>
            </div>
          </div>
          <div className={styles.checkDiv}>
            <select
              className={styles.select}
              id="audience"
              key={session?.user?.id}
            >
              {options.map((option, index) => (
                <option key={index} value={option.value} typeof="number">{option.label}</option>
              ))}
            </select>
          </div>
        </div>


        <div className={styles.dialogDivFooter}>
          <div className={styles.redButton}>
            <BsFillCameraVideoFill className="m-1"></BsFillCameraVideoFill>
            <a>{local.button.record}</a>
          </div>
          <button className={styles.greenButton}>{local.button.publish}</button>
        </div>
      </form>
    </>
  )
}