"use client"
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';


export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  // Toast Уведомления
  const notifyWarning = () => toast.error("Пароли не совпадают!",{});
  const notifyError = () => toast.error("Не все поля заполнены!",{});
  const notifyErrorServer = () => toast.error("Ошибка Сервера!",{});
  const notifyErrorUser = () => toast.error("Пользователь под таким адресом уже зарегистрирован!",{});
  const notifySuccess = () => toast.success("Регистрация Успешна!",{});
  
  const onSubmit = async (data: any) => {
    if (data.password === data.confirmPassword){
        let response = await fetch("http://localhost:5288/Auth/SignUp", {
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
              <h2 className={styles.textH2}>Регистрация</h2>
              <span>У вас уже есть аккаунт? <a className={styles.link} href="signIn">Войти</a></span>
            </div>
            <form className={styles.formSignUp} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName" className={styles.inputLabel}>Имя</label>
                <input type="text" className={styles.input} placeholder="Введите имя" {...register('firstName')} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="lastName" className={styles.inputLabel}>Фамилия</label>
                <input type="text" className={styles.input} placeholder="Введите фамилию" {...register('lastName')} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>Почта</label>
                <input type="email" className={styles.input} placeholder="Введите почту" {...register('email')} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.inputLabel}>Пароль</label>
                <input type="password"  className={styles.input} placeholder="***************" {...register('password')}/>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.inputLabel}>Подтверждение пароля</label>
                <input type="password" className={styles.input} placeholder="***************" {...register('confirmPassword')}/>
              </div>
              <div className={styles.centerContainer}>
                <button className={styles.button} type='submit'>Регистрация</button>
              </div>
            </form>
            <p>©2023 <a className={styles.link} target="_blank" href={process.env.NEXTAUTH_URL}>Connections.</a> Все права защищены</p>
          </div>
        </div>
      </div>
    </div>
  );
}
