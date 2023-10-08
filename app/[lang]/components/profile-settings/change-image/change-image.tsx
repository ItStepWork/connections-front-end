'use client'
import { useForm } from "react-hook-form";
import { RxUpload } from "react-icons/rx";
import { toast } from "react-toastify";
import { UserService } from "../../../../../services/user.service";
import { useStore } from "../../../../../stores/userDataStore";
import styles from './change-image.module.scss';
import { FileFormats } from "../../../../../enums/all.enum";
import { CheckService } from "../../../../../services/check.service";

const ChangeImage = ({ local }: { local: any }) => {

  const notifyFormatError = () => toast.error(local.setImages.toasts.formatErr, {});
  const notifyErrorServer = () => toast.error(local.setImages.toasts.serverErr, {});
  const notifySuccess = () => toast.success(local.setImages.toasts.ok, {});
  const options = [
    {
      label: local.setImages.avatar,
      value: '0',
    },
    {
      label: local.setImages.bg,
      value: '1',
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (e: any) => {
    if (CheckService.imageFormat(e.target.files[0].name)) {
      let formData = new FormData();
      formData.append("file", e.file[0]);
      if (e.imageSelect === '0') {
        let result = await UserService.setUserAvatarImage(formData);
        if (result === null) notifyErrorServer();
        else notifySuccess();
      }
      if (e.imageSelect === '1') {
        let result = await UserService.setUserBgImage(formData);
        if (result === null) notifyErrorServer();
        else notifySuccess();
      }
    }
    else notifyFormatError();
  }


  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.dropZoneContainer}>
            <label htmlFor="dropzone-file" className={styles.dropZoneLabel}>
              <div className={styles.dropZoneSVGContainer}>
                <div className={styles.dropZoneSVG}>
                  <RxUpload size={100} />
                </div>
                <p className="font-semibold">{local.settingsImages.text1}</p>
                <p>{local.settingsImages.text2}</p>
                <p>{local.settingsImages.text3}</p>
                <p>{local.settingsImages.text4}</p>
              </div>
              <input id="dropzone-file" type="file" accept={FileFormats.All} {...register('file')} required className="hidden" />
            </label>
          </div>
          <div className={styles.buttonContainer}>
            <select className={styles.select} {...register('imageSelect')} id="imageSelect">
              {options.map((option, index) => (
                <option key={index} value={option.value} typeof="number">
                  {option.label}
                </option>))
              }
            </select>
            <button className={styles.button} type='submit'>{local.button.set}</button>
          </div>
        </form>
      </div>
    </>
  )
};

export default ChangeImage;