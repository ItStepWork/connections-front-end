import LeftMessage from '../leftMessage/page'
import RigthMessage from '../rigthMassage/page'
import TopMessage from '../topMessage/page'
import styles from './styles.module.scss'

export default function MainBlock(props: any) {
  console.log("mesaa");
console.log(props);
  return (
    <>
      <div className={styles.container}>
        {props.messages.map((message: any, index: number)=>{
          if(message.senderId === props.myId) {
            return(<RigthMessage key={index} message={message}/>)
          }
          else {
            return(<LeftMessage key={index} message={message}/>)
          }
        })}
        {/* <TopMessage />
        <LeftMessage />
        <RigthMessage /> */}
      </div>
    </>
  )
}