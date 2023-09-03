"use client"
import { useSession } from "next-auth/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserService } from "../../../../../services/user.service";
import { useStore } from "../../../../../stores/userDataStore";
import styles from "./accountSettings.module.scss";


export const AccountSettings: FC = () => {

  const options = [
    {
      label: "Не указано",
      value: 0,
    },
    {
      label: "Мужской",
      value: 1,
    },
    {
      label: "Женский",
      value: 2,
    },
  ];
  const { data: session, update } = useSession();
  const notifySuccess = () => toast.success("Данные обновлены!",{});
  const notifyError = () => toast.error("Данные не обновлены!",{});
  const [fetchUser, firstName, lastName, phone, email, gender, familyStatus, work, location, aboutMe] = useStore((state) => 
  [state.fetchUser, state.firstName, state.lastName, state.phone, state.email, state.gender, state.familyStatus, state.work, state.location, state.aboutMe]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    //if (data.file[0].name.endsWith('.jpg') || data.file[0].name.endsWith('.jpeg') || data.file[0].name.endsWith('.png')) {
   // }
    let result = await UserService.setUserProfile(data);
    console.log(result);
    (result === null) ? notifyError() : notifySuccess();
    
  }
  return (
    <>
      <section className={styles.container} key={session?.user.id}>
        <div className={styles.description}>
          <h2>Настройки Аккаунта</h2>
          <span>Здесь будет описание профиля которое человек запишет в text-area ниже потенциально тут может быть много текста, в оригинале что-то про геев было написано, короче непонятно</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.namesBlock}>
            <div className={styles.inputContainer}>
              <label htmlFor="firstName" className={styles.inputLabel}>Имя</label>
              <input
                type="text"
                id="firstName"
                className={styles.label}
                autoComplete="new-fName"
                placeholder={firstName === '' ? 'не указано' : firstName}
                {...register('firstName')} required />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="lastName" className={styles.inputLabel}>Фамилия</label>
              <input
                type="text"
                id="lastName"
                autoComplete="new-lName"
                className={styles.label}
                key={session?.user?.id}
                placeholder={lastName === '' ? 'не указано' : lastName}
                {...register('lastName')} required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="born" className={styles.inputLabel}>Дата рождения</label>
              <input type="date" id="born" className={styles.label} key={session?.user?.id} {...register('born')} />
            </div>
          </div>

          <div className={styles.namesBlock}>
            <div className={styles.inputContainer}>
              <label htmlFor="phone" className={styles.inputLabel}>Телефон</label>
              <input
                type="tel"
                id="phone"
                autoComplete="new-phone"
                key={session?.user?.id}
                className={styles.label}
                placeholder={phone === '' ? 'не указано' : phone}
                {...register('phone')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="email" className={styles.inputLabel}>Эл. почта</label>
              <input
                type="email"
                id="email"
                key={session?.user?.id}
                className={styles.label}
                autoComplete="new-email"
                placeholder={email === '' ? 'не указано' : email}
                required {...register('email')}  />
            </div>
          </div>

          <div className={styles.namesBlock}>
            <div className={styles.inputContainer}>
              <label htmlFor="gender" className={styles.inputLabel}>Пол</label>
                <select
                className={styles.label}
                id="gender"
   
                {...register('gender')}
                key={session?.user?.id}
                >
                  <option value=''>{gender}</option>
                  <option value='NotSelected'>Не указано</option>
                  <option value='Male'>Мужской</option>
                  <option value='Female'>Женский</option>
                  {/*
                  
              {options.map((option, index) => (
                <option key={index} value={option.value} typeof="number">{option.label}</option>
                ))}
              */}
                </select>
                

            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="familyStatus" className={styles.inputLabel}>Семейный статус</label>
              <input
                type="text"
                id="familyStatus"
                className={styles.label}
                placeholder={familyStatus === '' ? 'не указано' : familyStatus}
                {...register('familyStatus')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="work" className={styles.inputLabel}>Работа</label>
              <input
                type="text"
                id="work"
                className={styles.label}
                placeholder={work === '' ? 'не указано' : work}
                {...register('work')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="location" className={styles.inputLabel}>Место жительства</label>
              <input
                type="text"
                id="location"
                className={styles.label}
                placeholder={location === '' ? 'не указано' : location}
                {...register('location')} />
            </div>
          </div>
          { /*

          <div className={styles.namesBlock}>
            <div className={styles.inputContainer}>
              <label htmlFor="avatar" className={styles.inputLabel}>Аватар</label>
              <input
                type="file"
                id="avatar"
                className={styles.label}
                accept="image/*" />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="profileBG" className={styles.inputLabel}>Фон профиля</label>
              <input
                type="file"
                id="profileBG"
                className={styles.label}
                accept="image/*" />
            </div>
          </div>
              */ }

          <div className={styles.namesBlock}>
            <div className={styles.textAreaContainer}>
              <label htmlFor="message" className={styles.textLabel}>Ваше сообщение</label>
              <textarea rows={4}
                id="message"
                className={styles.textArea}
                placeholder={aboutMe === '' ? 'Оставьте свой комментарий...' : aboutMe}
                {...register('aboutMe')}></textarea>
            </div>
          </div>
          <div className={styles.formButton}>
            <button type="submit" onClick={() => fetchUser()} className={styles.button}>Сохранить изменения</button>

          </div>
        </form>
      </section>
    </>
  )
}