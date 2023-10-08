import Story from "../Story-card/story";
import styles from "./stories-container.module.scss";


export const Stories = (props : any) => {

  return (
    <>
      <div className={styles.container}>
        <div className={props.stories.length !== 0 ? styles.storyContainer : styles.notEmpty}>
        {(props.stories.length !== 0)
        ? props.stories.map((story: any, index: number) => {      
          return(      
          <Story 
            key={index} 
            story={story} 
            myId={props.myId} 
            userId={props.userId} 
            index={index}
            local={props.local}
            />)                
        })
        : <div className={styles.empty}><h2>{props.local.stories.empty}</h2></div>
        }
        
        </div>
        
      </div>
    </>
  )
}