"use client"
import ToastError from "@/components/toasts/error-toasts/error";
import ToastSuccess from "@/components/toasts/success-toasts/success";
import { UserService } from "@/services/user.service";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./changePassword.module.scss";

export const ChangePassword: FC = () => {

  const [passwordValid, setPasswordValid] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState(false);

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
            setToast(false);
          }
          else if (result !== null) {
            setToast(true);
          }
        }
        else {
          setPasswordValid(false);
          setToast(false);
        }
    }

    useEffect(() => {
      setTimeout(()=>{
        setIsVisible(false)
       }, 5000)
    },[isVisible])

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
            <button type="submit" onClick={() => setIsVisible(true)} className={styles.button}>Обновить пароль</button>
          </div>
        </form>
      </section>
        <button onClick={() => setIsVisible(false)} className={!isVisible ? 'fixed bottom-5 left-[50%] cursor-pointer -translate-x-1/2 lg:opacity-0 md:opacity-0 opacity-0' : 'fixed bottom-5 -translate-x-1/2 left-[50%] cursor-pointer md:opacity-100 lg:opacity-100 opacity-100'}>
          {
            toast ? <ToastSuccess description="Пароль успешно изменен"/> : <ToastError description="Пароль не изменен"/>
          }
        </button>
    </>
  )
}