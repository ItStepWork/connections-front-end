"use client"
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserService } from "../../../../../services/user.service";
import { useStore } from "../../../../../stores/userDataStore";
import LocalSwitcherMinimal from "../../header/locale-switcher-minimal";
import styles from "./account-settings.module.scss";
import { useEffect, useState } from "react";

export const AccountSettings = (props: any) => {
  const [user, setUser] = useState<any>(null)
  const getUser = async () => {
    let result = await UserService.getCurrentUser()
    setUser(result)
  }
  useEffect(() => {
    getUser()
  }, [])
  const { data: session, update } = useSession();
  const notifySuccess = () => toast.success(props.local.settings.toasts.ok, {});
  const notifyError = () => toast.error(props.local.settings.toasts.fail, {});

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
      {user &&
        <div><section className={styles.container} key={session?.user.id}>
          <div className={styles.description}>
            <h2>{props.local.settings.title}</h2>
            <span>{props.local.settings.subtitle}</span>
          </div>
          {<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.namesBlock}>
              <div className={styles.inputContainer}>
                <label htmlFor="firstName" className={styles.inputLabel}>{props.local.settings.name}</label>
                <input
                  type="text"
                  id="firstName"
                  className={styles.label}
                  autoComplete="new-fName"
                  defaultValue={user.firstName}
                  placeholder={props.local.settings.placeholders.notIndicated}
                  {...register('firstName')} required />
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="lastName" className={styles.inputLabel}>{props.local.settings.lastName}</label>
                <input
                  type="text"
                  id="lastName"
                  autoComplete="new-lName"
                  className={styles.label}
                  key={session?.user?.id}
                  defaultValue={user.lastName}
                  placeholder={props.local.settings.placeholders.notIndicated}
                  {...register('lastName')} required />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="born" className={styles.inputLabel}>{props.local.settings.born}</label>
                <input
                  // defaultValue="2022-01-31"
                  defaultValue={new Date(user.birthDay).toLocaleDateString("fr-CA")}
                  type="date" id="born" className={styles.label} key={session?.user?.id} {...register('born')} />
              </div>
            </div>

            <div className={styles.namesBlock}>
              <div className={styles.inputContainer}>
                <label htmlFor="phone" className={styles.inputLabel}>{props.local.settings.phone}</label>
                <input
                  type="tel"
                  id="phone"
                  autoComplete="new-phone"
                  key={session?.user?.id}
                  className={styles.label}
                  defaultValue={user.phone}
                  placeholder={props.local.settings.placeholders.notIndicated}
                  {...register('phone')} required />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="email" className={styles.inputLabel}>{props.local.settings.email}</label>
                <input
                  type="email"
                  id="email"
                  key={session?.user?.id}
                  className={styles.label}
                  autoComplete="new-email"
                  defaultValue={user.email}
                  placeholder={props.local.settings.placeholders.notIndicated}
                  required {...register('email')} />
              </div>
            </div>

            <div className={styles.namesBlock}>
              <div className={styles.inputContainer}>
                <label htmlFor="gender" className={styles.inputLabel}>{props.local.settings.gender.title}</label>
                <select
                  className={styles.label}
                  id="gender"
                  required
                  {...register('gender')}
                  key={session?.user?.id}
                  defaultValue={user.gender}
                >
                  <option value='NotSelected'>{props.local.settings.gender.none}</option>
                  <option value='Male'>{props.local.settings.gender.male}</option>
                  <option value='Female'>{props.local.settings.gender.female}</option>
                </select>


              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="familyStatus" className={styles.inputLabel}>{props.local.settings.familyStatus}</label>
                <input
                  type="text"
                  id="familyStatus"
                  className={styles.label}
                  defaultValue={user.familyStatus}
                  placeholder={props.local.settings.placeholders.notIndicated}
                  {...register('familyStatus')} required />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="work" className={styles.inputLabel}>{props.local.settings.work}</label>
                <input
                  type="text"
                  id="work"
                  className={styles.label}
                  defaultValue={user.work}
                  placeholder={props.local.settings.placeholders.notIndicated}
                  {...register('work')} />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="location" className={styles.inputLabel}>{props.local.settings.location}</label>
                <input
                  type="text"
                  id="location"
                  className={styles.label}
                  defaultValue={user.location}
                  placeholder={props.local.settings.placeholders.notIndicated}
                  {...register('location')} />
              </div>
            </div>
            <div className={styles.namesBlock}>
              <div className={styles.textAreaContainer}>
                <label htmlFor="message" className={styles.textLabel}>{props.local.settings.aboutMe}</label>
                <textarea rows={4}
                  id="message"
                  className={styles.textArea}
                  defaultValue={user.aboutMe}
                  placeholder={props.local.settings.placeholders.comment}
                  {...register('aboutMe')}></textarea>
              </div>
            </div>
            <div className={styles.formButton}>
              <div className={styles.localeSwitcherContainer}>
                <label className={styles.textLabel}>{props.local.settings.local}</label>
                <LocalSwitcherMinimal />
              </div>
              <button type="submit" className={styles.button}>{props.local.button.saveData}</button>
            </div>
          </form>}
        </section>
        </div>}

    </>
  )
}