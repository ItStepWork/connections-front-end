"use client"
import { useSession } from "next-auth/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "./accountSettings.module.scss";

export const AccountSettings: FC = () => {

  const options = [
    {
      label: "Не указано",
      value: '0',
    },
    {
      label: "Мужской",
      value: '1',
    },
    {
      label: "Женский",
      value: '2',
    },
  ];
  const { data: session, update } = useSession();
  console.log(session);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {

    const newSession = {
      ...session,
      user: {
        ...session?.user,
        firstName: data.firstName,
        lastName: data.lastName,
        aboutMe: data.aboutMe,
        phone: data.phone,
      },

    };

    console.log(session?.expires)
    let response = await fetch("http://localhost:5288/User/UpdateUser", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + session?.user?.accessToken
      },
      body: JSON.stringify(data),
    });

    let result = await response.text();
    if (response.ok)
      await update(newSession);
    alert(result);
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
                placeholder={(session?.user?.firstName!) === undefined ? 'не указано' : session?.user?.firstName!}
                {...register('firstName')} required />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="lastName" className={styles.inputLabel}>Фамилия</label>
              <input
                type="text"
                id="lastName"
                className={styles.label}
                key={session?.user?.id}
                placeholder={(session?.user?.lastName!) === undefined ? 'не указано' : session?.user?.lastName!}
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
                key={session?.user?.id}
                className={styles.label}
                placeholder={(session?.user?.phone!) === undefined ? 'не указано' : session?.user?.phone!}
                {...register('phone')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="email" className={styles.inputLabel}>Эл. почта</label>
              <input
                type="email"
                id="email"
                key={session?.user?.id}
                className={styles.label}
                placeholder={(session?.user?.email!) === undefined ? 'не указано' : session?.user?.email!}
                required {...register('email')} />
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
                {options.map((option, index) => (
                  <option key={index} value={option.value} typeof="number">{option.label}</option>
                ))}
              </select>


            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="familyStatus" className={styles.inputLabel}>Семейный статус</label>
              <input
                type="text"
                id="familyStatus"
                className={styles.label}
                placeholder={(session?.user?.familyStatus!) === undefined ? 'не указано' : session?.user?.familyStatus!}
                {...register('familyStatus')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="work" className={styles.inputLabel}>Работа</label>
              <input
                type="text"
                id="work"
                className={styles.label}
                placeholder={(session?.user?.work!) === undefined ? 'не указано' : session?.user?.work!}
                {...register('work')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="live" className={styles.inputLabel}>Место жительства</label>
              <input
                type="text"
                id="live"
                className={styles.label}
                placeholder={(session?.user?.location!) === undefined ? 'не указано' : session?.user?.location!}
                {...register('live')} />
            </div>
          </div>

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

          <div className={styles.namesBlock}>
            <div className={styles.textAreaContainer}>
              <label htmlFor="message" className={styles.textLabel}>Ваше сообщение</label>
              <textarea rows={4}
                id="message"
                className={styles.textArea}
                //placeholder={(session?.user?.aboutMe!) === undefined ? 'Оставьте свой коментарий...' : session?.user?.aboutMe!}
                {...register('aboutMe')}></textarea>
            </div>
          </div>
          <div className={styles.formButton}>
            <button type="submit" className={styles.button}>Сохранить изменения</button>

          </div>
        </form>
      </section>
    </>
  )
}