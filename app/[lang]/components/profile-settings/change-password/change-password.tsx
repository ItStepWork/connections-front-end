"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserService } from "../../../../../services/user.service";
import styles from "./change-password.module.scss";

export const ChangePassword = ({local} : {local : any}) => {

  const [passwordValid, setPasswordValid] = useState(true);

  // Toast Уведомления
  const notifyWarning = () => toast.warning(local.changePassword.toasts.mismatch,{});
  const notifyError = () => toast.error(local.changePassword.toasts.error,{});
  const notifySuccess = () => toast.success(local.changePassword.toasts.ok,{});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Обработка формы изменения пароля
  const onSubmit = async (data: any) => {  
    data.preventDefault;
        if(data.newPassword === data.confirmPassword){
          setPasswordValid(true);
          const mutatedData: any = { oldPassword: data.oldPassword , newPassword: data.newPassword}
          let result = await UserService.setUserPassword(mutatedData);
          (result === null) ? notifyError() : notifySuccess();
        }
        else {
          setPasswordValid(false);
          notifyWarning();
        }
    }
  return (
    <>
      <section className={styles.container} >

        <div className={styles.description}>
          <h2>{local.changePassword.title}</h2>
          <span>{local.changePassword.subtitle}</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.namesBlock}>
            <div className={styles.inputContainer}>
              <label htmlFor="CurrentPassword" className={styles.inputLabel}>{local.changePassword.password}</label>
              <input type="password" id="CurrentPassword" {...register('oldPassword')} className={styles.input} placeholder={local.changePassword.placeholders.pass} required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="password" className={styles.inputLabel}>{local.changePassword.newPass}</label>
              <input type="password" id="password" {...register('newPassword')} className={passwordValid ? styles.input : styles.inputError} placeholder={local.changePassword.placeholders.newPass} required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="ConfirmPassword" className={styles.inputLabel}>{local.changePassword.confirmPass}</label>
              <input type="password" id="ConfirmPassword" {...register('confirmPassword')} className={passwordValid ? styles.input : styles.inputError} placeholder={local.changePassword.placeholders.confirmPass} required />
            </div>
          </div>
          <div className={styles.formButton}>
            <button type="submit" className={styles.button}>Обновить пароль</button>
          </div>
        </form>
      </section>
    </>
  )
}