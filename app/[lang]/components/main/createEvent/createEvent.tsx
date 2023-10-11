import { faker } from '@faker-js/faker';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { CelebrationService } from '../../../../../services/celebration.service';
import styles from "./styles.module.scss";

export const CreateEvent = (props: any) => {

  const {
    user,
    local
  } = props;

  const closeDialog = () => {
    var dialog: any = document.getElementById("postDialog")
    dialog?.close();
  }
  const options = [
    {
      label: local.events.create.meeting,
      value: 'Meeting',
    },
    {
      label: local.events.create.celebration,
      value: 'Celebration',
    },
    {
      label: local.events.create.birthday,
      value: 'BirthDay',
    },
  ];
  const notifyError = () => toast.error(local.createGroup.toasts.format, {});
  const notifyErrorServer = () => toast.error(local.createGroup.toasts.error, {});
  const notifySuccess = (text: string) => toast.success(text, {});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    data.date = new Date(data.date).toUTCString();
    
    let result = await CelebrationService.addEvent(data);
    if (result === null) notifyErrorServer();
    else notifySuccess(result);
    closeDialog();
  }
  return (
    <>
      <form className={styles.dialogDiv} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.dialogDivHeader}>
          <h2 className={styles.labels}>{local.events.create.title}</h2>
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
              <textarea className={styles.grInput} rows={2} placeholder={local.events.create.name} {...register('name')} required></textarea>
            </div>
          </div>
          <label className={styles.labelSM}>{local.events.create.type}</label>
          <div className={styles.checkDiv}>
            <select
              className={styles.select}
              id="eventType" {...register('eventType')}
              key={user?.id}
            >
              {options.map((option, index) => (
                <option key={index} value={option.value} typeof="number">{option.label}</option>
              ))}
            </select>
          </div>
          <label className={styles.labelSM}>{local.events.create.date}</label>
          <input className={styles.grInput} type="datetime-local"{...register('date')} required></input>
        </div>
        <div className={styles.dialogDivFooter}>
          <button type='submit' className={styles.greenButton}>{local.button.create}</button>
        </div>
      </form>
    </>
  )
}