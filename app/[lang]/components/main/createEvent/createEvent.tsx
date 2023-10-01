import { faker } from '@faker-js/faker';
import { useSession } from "next-auth/react";
import { AiOutlineClose } from 'react-icons/ai';
import { BsCalendar2EventFill, BsCameraReelsFill, BsFillCameraVideoFill, BsFillEmojiSmileFill } from 'react-icons/bs';
import { HiPhoto } from 'react-icons/hi2';
import { MdLocalOffer, MdLocationPin } from 'react-icons/md';
import styles from "./styles.module.scss";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CelebrationService } from '../../../../../services/celebration.service';

export const CreateEvent = (props: any) => {
  const closeDialog = () => {
    //  document.querySelector("dialog")?.close();
    var dialog: any = document.getElementById("postDialog")
    dialog?.close();
  }
  // const { data: session, update } = useSession();
  const options = [
    {
      label: "Meeting",
      value: 'Meeting',
    },
    {
      label: "Celebration",
      value: 'Celebration',
    },
    {
      label: "BirthDay",
      value: 'BirthDay',
    },
  ];
  const notifyError = () => toast.error(props.local.createGroup.toasts.format, {});
  const notifyErrorServer = () => toast.error(props.local.createGroup.toasts.error, {});
  const notifySuccess = () => toast.success(props.local.createGroup.toasts.ok, {});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    data.date = new Date(data.date).toUTCString();
    console.log(data)
    // let formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("eventType", data.eventType);
    // formData.append("date", new Date(data.date).toUTCString());
    // formData.append("userId", props.session.user.id);
    // console.log(formData)
    let result = await CelebrationService.addEvent(data);
    if (result === null) notifyErrorServer();
    else notifySuccess();
    alert(result)
    // props.getGroups();
    closeDialog();
    // else notifyError();
  }
  return (
    <>
      <form className={styles.dialogDiv} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.dialogDivHeader}>
          <h2 className={styles.labels}>Create Event</h2>
          <button type="button" className={styles.closeButton} onClick={closeDialog}>
            <AiOutlineClose size={16}></AiOutlineClose>
          </button>
        </div>
        <div className={styles.dialogDivBody}>
          <div className="m-1 w-full">
            <div className={styles.topDiv}>
              {props.user?.avatarUrl
                ? <img className={styles.userIco} src={props.user.avatarUrl}></img>
                : <img className={styles.userIco} src={faker.image.avatar()}></img>
              }
              <textarea className={styles.grInput} rows={2} placeholder="Event Name" {...register('name')} required></textarea>
            </div>
          </div>
          {/* <div className={styles.bottomDiv}>
            <div className={styles.roundedDiv + " bg-green-900 "}>
              <HiPhoto size={16} title={props.local.posts.tooltip.photo} className="fill-green-500"></HiPhoto>
            </div>
            <div className={styles.roundedDiv + " bg-blue-900 "}>
              <BsCameraReelsFill title={props.local.posts.tooltip.video} size={16} className="fill-blue-500"></BsCameraReelsFill>
            </div>
            <div className={styles.roundedDiv + " bg-red-900 "}>
              <BsCalendar2EventFill title={props.local.posts.tooltip.event} size={16} className="fill-red-500"></BsCalendar2EventFill>
            </div>
            <div className={styles.roundedDiv + " bg-yellow-900 "}>
              <BsFillEmojiSmileFill title={props.local.posts.tooltip.activity} size={16} className="fill-yellow-500"></BsFillEmojiSmileFill>
            </div>
            <div className={styles.roundedDiv + " bg-green-900 "}>
              <MdLocationPin title={props.local.posts.tooltip.location} className="fill-gray-500" size={16}></MdLocationPin>
            </div>
            <div className={styles.roundedDiv + " bg-blue-900 "}>
              <MdLocalOffer title={props.local.posts.tooltip.tag} className="fill-blue-500" size={16}></MdLocalOffer>
            </div>
          </div> */}
          <label className={styles.labelSM}>Event Type</label>
          <div className={styles.checkDiv}>
            <select
              className={styles.select}
              id="eventType" {...register('eventType')}
              key={props.user?.id}
            >
              {options.map((option, index) => (
                <option key={index} value={option.value} typeof="number">{option.label}</option>
              ))}
            </select>
          </div>
          <label className={styles.labelSM}>Event Date</label>
          <input className={styles.grInput} type="datetime-local"{...register('date')} required></input>
        </div>


        <div className={styles.dialogDivFooter}>

          <button type='submit' className={styles.greenButton}>{props.local.button.create}</button>
        </div>
      </form>
    </>
  )
}