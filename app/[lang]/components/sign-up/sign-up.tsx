"use client"
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './sign-up.module.scss';


export default function SignUp({local} : {local : any}, props : any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  // Toast Уведомления
  const notifyWarning = () => toast.error(local.signUp.toasts.mismatchPasswords,{});
  const notifyError = () => toast.error(local.signUp.toasts.emptyFields,{});
  const notifyErrorServer = () => toast.error(local.signUp.toasts.serverError,{});
  const notifyErrorUser = () => toast.error(local.signUp.toasts.emailError,{});
  const notifySuccess = () => toast.success(local.signUp.toasts.ok,{});
  
  const onSubmit = async (data: any) => {
    if (data.password === data.confirmPassword){
        let response = await fetch(process.env.NEXT_PUBLIC_API + "Auth/SignUp", {
          method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        }),
      });
      let result = await response.text();
      (response.status === 500) ? notifyErrorServer() : (response.status === 400) ? notifyError() : (response.status === 409) ? notifyErrorUser() : notifySuccess();
      router.push("/signIn");
    }
    else notifyWarning();
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.centerContainer}>
        <div className={styles.verticalContainer}>
          <div className={styles.cardSignUp}>
            <div className={styles.textCenter}>
              <h2 className={styles.textH2}>{local.signUp.title}</h2>
              <span>{local.signUp.description} <a className={styles.link} href="signIn">{local.signUp.toSignIn}</a></span>
            </div>
            <form className={styles.formSignUp} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName" className={styles.inputLabel}>{local.signUp.name}</label>
                <input type="text" className={styles.input} placeholder={local.signUp.placeholders.name} {...register('firstName')} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="lastName" className={styles.inputLabel}>{local.signUp.lastName}</label>
                <input type="text" className={styles.input} placeholder={local.signUp.placeholders.lastName} {...register('lastName')} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>{local.signUp.mail}</label>
                <input type="email" className={styles.input} placeholder={local.signUp.placeholders.mail} {...register('email')} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.inputLabel}>{local.signUp.pass}</label>
                <input type="password"  className={styles.input} placeholder="***************" {...register('password')}/>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.inputLabel}>{local.signUp.confirmPass}</label>
                <input type="password" className={styles.input} placeholder="***************" {...register('confirmPassword')}/>
              </div>
              <div className={styles.centerContainer}>
                <button className={styles.button} type='submit'>{local.signUp.registrationBtn}</button>
              </div>
            </form>
            <p>©2023 <a className={styles.link} target="_blank" href={process.env.NEXTAUTH_URL}>Connections.</a> {local.copyright}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
