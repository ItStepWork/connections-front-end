'use client'
import { useEffect, useState } from 'react';
import { Card } from './card';
import styles from './groupsCard.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { CreateGroup } from './createGroup/createGroup';
import { GroupService } from '@/services/group.service';
import { getSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';

export function GroupsCard(props: any) {
  const [session, setSession] = useState<any>()
  const [groups, setGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [count, setCount] = useState(3);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getGroups();
    getUserSession();
  }, []);
  const getGroups = async () => {
    let result = await GroupService.getGroups(props.userId);
    setGroups(result);
    setAllGroups(result);
  }
  const getUserSession = async () => {
    let result = await getSession();
    setSession(result);
  }
  const openDialog = () => {
    var dialog: any = document.getElementById("createGroupDialog")
    dialog?.showModal();
  }
  const changeSearch = (event: any) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setGroups(allGroups);
    }
    else {

      let search = event.target.value.toLowerCase();
      let searchGroups = allGroups.filter((g: any) => g.name?.toLowerCase().includes(search));
      setGroups(searchGroups);
    }
  }
  return (
    <>
      <div className={styles.container}>

        <div className={styles.header}>
          <div className={styles.groups}>
            <h2>Сообщества</h2>
            <div className={styles.counter}>{groups.length}</div>
          </div>
          {session?.user?.id === props.userId &&
            <button className={styles.button} onClick={openDialog} >
              <AiOutlinePlus className="dark:fill-blue" size={35}></AiOutlinePlus>
            </button>}
        </div>
        <div className="flex mb-6">
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder="Введите название группы" onChange={(e) => { changeSearch(e) }} value={search} />
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cards}>
            {groups.map((group: any, index) => {
              if (index <= count)
                return (<Card key={group.id} group={group} getGroups={getGroups} ></Card>)
            })}
          </div>
          <button className={styles.buttonLoadMore} onClick={() => setCount(count + 4)}>Загрузить ещё</button>
        </div>
      </div>
      <dialog className={styles.dialog} id='createGroupDialog'>
        {<CreateGroup getGroups={getGroups}></CreateGroup>}
      </dialog>

    </>
  )
}