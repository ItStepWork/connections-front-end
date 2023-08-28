"use client"
import { UserService } from "@/services/user.service";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from "./changePassword.module.scss";

export const ChangePassword: FC = () => {

  const [passwordValid, setPasswordValid] = useState(true);

  const notifyWarning = () => toast.warning("Пароли не одинаковые!",{});
  const notifyError = () => toast.error("Пароль не изменен!",{});
  const notifySuccess = () => toast.success("Пароль изменен!",{});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {  
    data.preventDefault;
        if(data.newPassword === data.confirmPassword){
          setPasswordValid(true);
          const mutatedData: any = { oldPassword: data.oldPassword , newPassword: data.newPassword}
          let result = await UserService.setUserPassword(mutatedData);
          if(result === null){
            notifyError();
          }
          else if (result !== null) {
            notifySuccess();
          }
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
          <h2>Измените ваш пароль</h2>
          <span>Для смены пароля необходимо ввести старый пароль, далее ввести новый пароль и подтвердить его, новый пароль и подтверждение пароля должны совпадать.</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.namesBlock}>
            <div className={styles.inputContainer}>
              <label htmlFor="CurrentPassword" className={styles.inputLabel}>Текущий пароль</label>
              <input type="password" id="CurrentPassword" autoComplete="new-password" {...register('oldPassword')} className={styles.input} placeholder="введите старый пароль" required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="password" className={styles.inputLabel}>Новый пароль</label>
              <input type="password" id="password" autoComplete="new-password" {...register('newPassword')} className={passwordValid ? styles.input : styles.inputError} placeholder="введите новый пароль" required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="ConfirmPassword" className={styles.inputLabel}>Подтвердите пароль</label>
              <input type="password" id="ConfirmPassword" autoComplete="new-password" {...register('confirmPassword')} className={passwordValid ? styles.input : styles.inputError} placeholder="подтвердите новый пароль" required />
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