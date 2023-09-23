import { faker } from "@faker-js/faker"
import styles from "./styles.module.scss"
import PostInfo from "./postInfo/postInfo"

export const PostsBlock = (props: any) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <img className={styles.userIco} src={faker.image.avatar()}></img>
          <a className={styles.userName}>{faker.person.firstName()} {faker.person.lastName()}</a>
        </div>
        <a>{faker.lorem.text()}</a>
        <img className={styles.postImage} style={{ objectFit: "cover" }} src={faker.image.avatar()} sizes="100vw" alt="avatar" />
        <PostInfo></PostInfo>
      </div>
    </>
  )
}