import { faker } from '@faker-js/faker';
import { AiOutlineClose } from 'react-icons/ai';
import styles from "./styles.module.scss";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CelebrationService } from '../../../../../services/celebration.service';

export const CreateEvent = (props: any) => {
  const closeDialog = () => {
    var dialog: any = document.getElementById("postDialog")
    dialog?.close();
  }
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
  const notifySuccess = (text: string) => toast.success(text, {});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    data.date = new Date(data.date).toUTCString();
    console.log(data)
    let result = await CelebrationService.addEvent(data);
    if (result === null) notifyErrorServer();
    else notifySuccess(result);
    closeDialog();
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