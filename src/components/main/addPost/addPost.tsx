import styles from "./styles.module.scss"
import { useSession } from "next-auth/react";
import { faker } from '@faker-js/faker';
import { HiPhoto } from 'react-icons/hi2'
import { BsCameraReelsFill } from 'react-icons/bs'
import { BsCalendar2EventFill } from 'react-icons/bs'
import { BsFillEmojiSmileFill } from 'react-icons/bs'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { MdLocationPin } from 'react-icons/md'
import { MdLocalOffer } from 'react-icons/md'

export const AddPost = () => {
  const closeDialog = () => { document.querySelector("dialog")?.close(); }
  const openDialog = () => { document.querySelector("dialog")?.showModal(); }
  const { data: session, update } = useSession();
  const options = [
    {
      label: "Public",
      value: '0',
    },
    {
      label: "Only Me",
      value: '1',
    },
    {
      label: "Friends",
      value: '2',
    },
  ];
  return (
    <>



      <div className={styles.container}>
        <div className={styles.topDiv}>
          <img className={styles.userIco} src={faker.image.avatar()}></img>
          <input type="text" className={styles.grInput} onClick={openDialog} placeholder="Share your thougs..."></input>
        </div>
        <div className={styles.bottomDiv}>
          <div className={styles.btnDiv}>
            <HiPhoto size={16} className="fill-green-500"></HiPhoto>
            <a>Photo</a>
          </div>
          <div className={styles.btnDiv}>
            <BsCameraReelsFill size={16} className="fill-blue-500"></BsCameraReelsFill>
            <a>Video</a>
          </div>
          <div className={styles.btnDiv}>
            <BsCalendar2EventFill size={16} className="fill-red-500"></BsCalendar2EventFill>
            <a>Event</a>
          </div>
          <div className={styles.btnDiv}>
            <BsFillEmojiSmileFill size={16} className="fill-yellow-500"></BsFillEmojiSmileFill>
            <a>Feeling/Activity</a>
          </div>
          <div className={styles.btnDivEnd}>
            <div className={styles.btnDiv}>
              <BsThreeDots class="ml-2 mr-2" size={16}></BsThreeDots>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomDiv}></div>




      <dialog >
        <form className={styles.dialogDiv} >
          <div className={styles.dialogDivHeader}>
            <h2 className={styles.labels}>Create post</h2>
            <button type="button" className={styles.closeButton} onClick={closeDialog}>
              <AiOutlineClose size={16}></AiOutlineClose>
            </button>
          </div>
          <div className={styles.dialogDivBody}>
            <div className="mb-3">
              <div className={styles.topDiv}>
                <img className={styles.userIco} src={faker.image.avatar()}></img>
                <textarea className={styles.grInput} rows={4} placeholder="Share your thougts..." required></textarea>
              </div>
            </div>
            <div className={styles.bottomDiv}>
              <div className={styles.roundedDiv + " bg-green-900 "}>
                <HiPhoto size={16} className="fill-green-500"></HiPhoto>

              </div>
              <div className={styles.roundedDiv + " bg-blue-900 "}>
                <BsCameraReelsFill size={16} className="fill-blue-500"></BsCameraReelsFill>

              </div>
              <div className={styles.roundedDiv + " bg-red-900 "}>
                <BsCalendar2EventFill size={16} className="fill-red-500"></BsCalendar2EventFill>

              </div>
              <div className={styles.roundedDiv + " bg-yellow-900 "}>
                <BsFillEmojiSmileFill size={16} className="fill-yellow-500"></BsFillEmojiSmileFill>

              </div>

              <div className={styles.roundedDiv + " bg-green-900 "}>
                <MdLocationPin className="fill-gray-500" size={16}></MdLocationPin>
              </div>
              <div className={styles.roundedDiv + " bg-blue-900 "}>
                <MdLocalOffer className="fill-blue-500" size={16}></MdLocalOffer>
              </div>
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
          
          <div className={styles.dialogDivFooter}>
          <button className={styles.redButton}>Live video</button>
          <button className={styles.greenButton}>Post</button>
          </div>
        </form>
      </dialog>
    </>
  )
}