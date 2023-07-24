import styles from './styles.module.scss'
export default function LoginPage() {
  return (
    <>
      <div className={styles.container}>
        <form>
          <div className={styles.formContainer}>
            <div className="mb-6">
              <label htmlFor="email" className={styles.inputLabel}>Email address</label>
              <input type="email" id="email" className={styles.input} placeholder="email@gmail.com" required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className={styles.inputLabel}>Password</label>
              <input type="password" id="password" className={styles.input} placeholder="•••••••••" required />
            </div>
            <button type="submit" className={styles.button}>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}