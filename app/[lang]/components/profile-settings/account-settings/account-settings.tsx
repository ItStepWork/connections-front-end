"use client"
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserService } from "../../../../../services/user.service";
import { useStore } from "../../../../../stores/userDataStore";
import styles from "./account-settings.module.scss";

export const AccountSettings = ({local} : {local : any}) => {

  const options = [
    {
      label: local.settings.gender.none,
      value: 0,
    },
    {
      label: local.settings.gender.male,
      value: 1,
    },
    {
      label: local.settings.gender.female,
      value: 2,
    },
  ];
  const { data: session, update } = useSession();
  const notifySuccess = () => toast.success(local.settings.toasts.ok, {});
  const notifyError = () => toast.error(local.settings.toasts.fail, {});
  const [fetchUser, firstName, lastName, phone, email, gender, familyStatus, work, location, aboutMe] = useStore((state) => 
  [state.fetchUser, state.firstName, state.lastName, state.phone, state.email, state.gender, state.familyStatus, state.work, state.location, state.aboutMe]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    let result = await UserService.setUserProfile(data);
    (result === null) ? notifyError() : notifySuccess();
    
  }
  
  return (
    <>
      <section className={styles.container} key={session?.user.id}>
        <div className={styles.description}>
          <h2>{local.settings.title}</h2>
          <span>{local.settings.subtitle}</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.namesBlock}>
            <div className={styles.inputContainer}>
              <label htmlFor="firstName" className={styles.inputLabel}>{local.settings.name}</label>
              <input
                type="text"
                id="firstName"
                className={styles.label}
                autoComplete="new-fName"
                placeholder={firstName === '' ? local.settings.placeholders.notIndicated : firstName}
                {...register('firstName')} required />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="lastName" className={styles.inputLabel}>{local.settings.lastName}</label>
              <input
                type="text"
                id="lastName"
                autoComplete="new-lName"
                className={styles.label}
                key={session?.user?.id}
                placeholder={lastName === '' ? local.settings.placeholders.notIndicated : lastName}
                {...register('lastName')} required />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="born" className={styles.inputLabel}>{local.settings.born}</label>
              <input type="date" id="born" className={styles.label} key={session?.user?.id} {...register('born')} />
            </div>
          </div>

          <div className={styles.namesBlock}>
            <div className={styles.inputContainer}>
              <label htmlFor="phone" className={styles.inputLabel}>{local.settings.phone}</label>
              <input
                type="tel"
                id="phone"
                autoComplete="new-phone"
                key={session?.user?.id}
                className={styles.label}
                placeholder={phone === '' ? local.settings.placeholders.notIndicated : phone}
                {...register('phone')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="email" className={styles.inputLabel}>{local.settings.email}</label>
              <input
                type="email"
                id="email"
                key={session?.user?.id}
                className={styles.label}
                autoComplete="new-email"
                placeholder={email === '' ? local.settings.placeholders.notIndicated : email}
                required {...register('email')}  />
            </div>
          </div>

          <div className={styles.namesBlock}>
            <div className={styles.inputContainer}>
              <label htmlFor="gender" className={styles.inputLabel}>{local.settings.gender.title}</label>
                <select
                className={styles.label}
                id="gender"
   
                {...register('gender')}
                key={session?.user?.id}
                >
                  <option value=''>{gender}</option>
                  <option value='NotSelected'>{local.settings.gender.none}</option>
                  <option value='Male'>{local.settings.gender.male}</option>
                  <option value='Female'>{local.settings.gender.female}</option>
                </select>
                

            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="familyStatus" className={styles.inputLabel}>{local.settings.familyStatus}</label>
              <input
                type="text"
                id="familyStatus"
                className={styles.label}
                placeholder={familyStatus === '' ? local.settings.placeholders.notIndicated : familyStatus}
                {...register('familyStatus')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="work" className={styles.inputLabel}>{local.settings.work}</label>
              <input
                type="text"
                id="work"
                className={styles.label}
                placeholder={work === '' ? local.settings.placeholders.notIndicated : work}
                {...register('work')} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="location" className={styles.inputLabel}>{local.settings.location}</label>
              <input
                type="text"
                id="location"
                className={styles.label}
                placeholder={location === '' ? local.settings.placeholders.notIndicated : location}
                {...register('location')} />
            </div>
          </div>
          <div className={styles.namesBlock}>
            <div className={styles.textAreaContainer}>
              <label htmlFor="message" className={styles.textLabel}>{local.settings.aboutMe}</label>
              <textarea rows={4}
                id="message"
                className={styles.textArea}
                placeholder={aboutMe === '' ? local.settings.placeholders.comment : aboutMe}
                {...register('aboutMe')}></textarea>
            </div>
          </div>
          <div className={styles.formButton}>
            <button type="submit" onClick={() => fetchUser()} className={styles.button}>{local.button.saveData}</button>

          </div>
        </form>
      </section>
    </>
  )
}