import { UserService } from "@/services/user.service"
import { useEffect, useState } from "react"
import { Follower } from "./follower"
import styles from "./follows.module.scss"

export const FollowsBlock = () => {

  const [users, setUsers] = useState<any[]>([]);
  const [elements, setElements] = useState(5);
  const slice = users.slice(0, elements);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let result = await UserService.getUsers(); 
    setUsers(result);
  } 

  const loadMore = () => {
    setElements(elements + elements);
  }

  return (
    <>
      <div className={styles.container}>
        <h2>На кого подписаться</h2>
        <div className={styles.followersBlock}>
          {
            slice.map((user: any, index) => (
              <div key={index}>
                <Follower checked={user.check} firstName={user.firstName} lastName={user.lastName} work={user.work} avatar={user.avatarUrl} id={user.id}/>                                           
              </div>
            ))
          }           
        </div>
        <button className={styles.buttonLoadMore} onClick={() => loadMore()}>Загрузить еще</button>
      </div>
    </>
  )
}
