import { Follower } from "./follower"
import styles from "./follows.module.scss"
export const FollowsBlock = () => {

  return (
    <>
      <div className={styles.container}>
        <h2>На кого подписаться</h2>
        <div className={styles.followersBlock}>
          <Follower checked={false}/>
          <Follower checked={false}/>
          <Follower checked={true}/>
          <Follower checked={false}/>
          <Follower checked={false}/>
        </div>
      </div>
    </>
  )
}