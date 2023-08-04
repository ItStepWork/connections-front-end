import styles from './styles.module.scss'
import { FaCheckDouble, FaCheck } from 'react-icons/fa';

export default function RigthMessage(props: any) {


  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          {props.message.link?(<img src={props.message.link} alt="Rounded avatar" />):(<></>)}
          {props.message.text}
        </div>
        <div className='flex m-1'>
          <div className={styles.time}>{new Date(props.message.createTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          {props.message.status === "Unread"? (<FaCheck className="fill-gray-400 p-0.5"/>):(<FaCheckDouble className="fill-blue-400 p-0.5"/>)}
        </div>
      </div>
    </>
  )
}