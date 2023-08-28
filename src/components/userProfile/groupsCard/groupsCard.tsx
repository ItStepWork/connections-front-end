'use client'
import { useEffect, useState } from 'react';
import { Card } from './card';
import styles from './groupsCard.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { CreateGroup } from './createGroup/createGroup';
import { GroupService } from '@/services/group.service';
import { getSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

export function GroupsCard(props: any) {
  const [session, setSession] = useState<any>()
  const [groups, setGroups] = useState([]);
  const [count, setCount] = useState(3);
  useEffect(() => {
    getGroups();
    getUserSession();
  }, []);
  const getGroups = async () => {
    let result = await GroupService.getGroups(props.userId);
    setGroups(result);
  }
  const getUserSession = async () => {
    let result = await getSession();
    setSession(result);
  }
  const openDialog = () => {
    var dialog: any = document.getElementById("createGroupDialog")
    dialog?.showModal();
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