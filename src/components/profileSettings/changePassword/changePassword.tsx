"use client"
import { UserService } from "@/services/user.service";
import { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "./changePassword.module.scss";

export const ChangePassword: FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {  
        if(data.newPassword !== null){
          let result = await UserService.setUserPassword(data);
          alert(result);
          console.log(await data)
        }
        else {
          alert("error")
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
              <input type="password" id="CurrentPassword" autoComplete="new-password" {...register('oldPassword')} className={styles.label} placeholder="введите старый пароль" required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="password" className={styles.inputLabel}>Новый пароль</label>
              <input type="password" id="password" autoComplete="new-password" {...register('newPassword')} className={styles.label} placeholder="введите новый пароль" required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="ConfirmPassword" className={styles.inputLabel}>Подтвердите пароль</label>
              <input type="password" id="ConfirmPassword" autoComplete="new-password"  className={styles.label} placeholder="подтвердите новый пароль" required />
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