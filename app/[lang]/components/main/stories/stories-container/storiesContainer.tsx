import Story from "../Story-card/story";
import styles from "./stories-container.module.scss";


export const Stories = (props : any) => {

  const {
    local, 
    myId,
    userId,
    stories
  } = props;

  return (
    <>
      <div className={styles.container}>
        <div className={stories.length !== 0 ? styles.storyContainer : styles.notEmpty}>
        {(stories.length !== 0)
        ? stories.map((story: any, index: number) => {      
          return(      
          <Story 
            key={index} 
            story={story} 
            local={local}
            />)                
        })
        : <div className={styles.empty}><h2>{local.stories.empty}</h2></div>
        }
        
        </div>
        
      </div>
    </>
  )
}