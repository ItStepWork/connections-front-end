import { useEffect, useState } from "react"
import { Friend } from "./friend"
import styles from "./friends.module.scss"
import { getSession } from "next-auth/react"
import { GroupService } from "../../../../../services/group.service"
import { FiSearch } from "react-icons/fi"

export const FriendsBlock = (props: any) => {

  const [users, setUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [elements, setElements] = useState(5);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let session = await getSession();
    if (session != null) {
      let result = await GroupService.getFriendsForInvitation(props.group.id);
      setUsers(result);
      setAllUsers(result);
    }
  }

  const loadMore = () => {
    setElements(elements + 5);
  }
  const changeSearch = (event: any) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setUsers(allUsers);
    }
    else {
      let search = event.target.value.toLowerCase();
      let searchUsers = allUsers.filter((u: any) => u.firstName?.toLowerCase().includes(search) || u.lastName?.toLowerCase().includes(search)
        || search.toLowerCase() === u.firstName.toLowerCase() + " " + u.lastName.toLowerCase() || search.toLowerCase() === u.lastName.toLowerCase() + " " + u.firstName.toLowerCase());
      setUsers(searchUsers);
    }
  }
  return (
    <>
      <div className={styles.container}>
        {/* <h2>На кого подписаться</h2> */}
        <div className="flex w-full">
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder="Введите имя или фамилию" onChange={(e) => { changeSearch(e) }} value={search} />
        </div>
        <div className={styles.followersBlock}>

          {
            users.map((user: any, index) => {
              if (index < elements) {
                return (<Friend key={user.id} friendStatus={user.friendStatus} firstName={user.firstName} lastName={user.lastName} work={user.work} avatar={user.avatarUrl} id={user.id} getUsers={getUsers} />)
              }
            })
          }
        </div>
        <div className="flex flex-grow items-end">
          <button className={styles.buttonLoadMore} onClick={() => loadMore()}>Загрузить еще</button>
        </div>

      </div>
    </>
  )
}
