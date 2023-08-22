'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { Card } from './card';
import styles from './groupsCard.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { CreateGroup } from './createGroup/createGroup';
import { GroupService } from '@/services/group.service';

export function GroupsCardMain(props: any) {
  const openDialog = () => { document.querySelector("dialog")?.showModal(); }
  const [groups, setGroups] = useState([]);
  const [count, setCount] = useState(3);
  useEffect(() => {
    getGroups();
  }, []);
  let LoadMore = () => {
    setCount(count + 4);
  }
  const getGroups = async () => {
    let result = await GroupService.getGroups();
    setGroups(result);
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.groups}>
            <h2>Сообщества</h2>
            <div className={styles.counter}>{groups.length}</div>
          </div>
          <button className={styles.button} onClick={openDialog} >
            <AiOutlinePlus className="dark:fill-blue" size={35}></AiOutlinePlus>
          </button>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cards}>
            {groups.map((group, index) => {
              if (index <= count)
                return (<Card key={index} group={group} getGroups={getGroups} ></Card>)
            })}
          </div>
          <div className={styles.loadMoreDiv}>
            <button className={styles.buttonLoadMore} onClick={() => LoadMore()}>Загрузить ещё</button>
          </div>

        </div>
      </div>
      <dialog className={styles.dialog} >
        {<CreateGroup getGroups={getGroups}></CreateGroup>}
      </dialog>
    </>
  )
}
export function GroupsCard() {
  const { data: session } = useSession();
  let user: any = session?.user;
  if (session === undefined) {
    return (<></>);
  }
  else
    return (
      <GroupsCardMain user={user} />
    )
}