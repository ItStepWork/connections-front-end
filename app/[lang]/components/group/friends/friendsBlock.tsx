import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import { Friend } from "./friend"
import styles from "./friends.module.scss"

export const FriendsBlock = (props: any) => {

  const {
    local,
    friendsForInvitation,
    group
  } = props;

  const [elements, setElements] = useState(5);
  const [search, setSearch] = useState("");


  const loadMore = () => {
    setElements(elements + 3);
  }
  const changeSearch = (event: any) => {
    setSearch(event.target.value);
  }
  const filter = (array: any[]) => {
    return array.filter((u: any) => u.firstName?.toLowerCase().includes(search.toLowerCase()) || u.lastName?.toLowerCase().includes(search.toLowerCase())
      || search.toLowerCase() === u.firstName.toLowerCase() + " " + u.lastName.toLowerCase() || search.toLowerCase() === u.lastName.toLowerCase() + " " + u.firstName.toLowerCase());
  }
  return (
    <>
      <div className={styles.container}>
        {/* <h2>На кого подписаться</h2> */}
        <div className={styles.inputContainer}>
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder={local.search.searchFullName} onChange={(e) => { changeSearch(e) }} value={search} />
        </div>
        <div className={styles.followersBlock}>

          {
            friendsForInvitation && filter(friendsForInvitation).map((user: any, index: number) => {
              if (index < elements) {
                return (
                <Friend 
                  key={user.id} 
                  friendStatus={user.friendStatus} 
                  firstName={user.firstName} 
                  lastName={user.lastName} 
                  work={user.work} 
                  avatar={user.avatarUrl} 
                  id={user.id} 
                  groupId={group.id} />
                  )
              }
            })
          }
        </div>
        <div className="flex flex-grow items-end">
          {elements < friendsForInvitation?.length && <button className={styles.buttonLoadMore} onClick={() => loadMore()}>{local.button.uploadMore}</button>}
        </div>

      </div>
    </>
  )
}
