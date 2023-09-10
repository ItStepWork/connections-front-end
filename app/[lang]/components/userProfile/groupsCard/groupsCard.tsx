'use client'

import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { CreateGroup } from '../../../../../app/[lang]/components/userProfile/groupsCard/createGroup/createGroup';
import { GroupService } from '../../../../../services/group.service';
import { Card } from './card';
import styles from './groupsCard.module.scss';

export function GroupsCard(props: any) {
  // const [session, setSession] = useState<any>()
  const [groups, setGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [count, setCount] = useState(3);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getGroups();
    let socket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToGroupsUpdates`, ["client", props.session.user.accessToken]);
    socket.addEventListener('message', (event) => {
      getGroups();
    });
    let intervalId = setInterval(() => {
      if (socket.OPEN) socket.send("ping");
      else clearInterval(intervalId);
    }, 30000);
    return () => {
      setInterval(() => { if (socket.OPEN) socket.close(); }, 1000)
      clearInterval(intervalId);
    };
    // getUserSession();
    // subscribe();
  }, []);
  const getGroups = async () => {
    let result = await GroupService.getGroups(props.userId);
    setGroups(result);
    setAllGroups(result);
  }
  // const getUserSession = async () => {
  //   let result = await getSession();
  //   setSession(result);
  // }
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
  // const subscribe = async () => {
  //   let session = await getSession();
  //   if (session != null) {
  //     let socket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToGroupsUpdates`, ["client", session.user.accessToken]);
  //     socket.addEventListener('message', (event) => {
  //       getGroups();
  //     });
  //     setInterval(() => {
  //       socket.send("ping");
  //     }, 30000);
  //   }
  // }
  return (
    <>
      <div className={styles.container}>

        <div className={styles.header}>
          <div className={styles.groups}>
            <h2>{props.local.profile.groups}</h2>
            <div className={styles.counter}>{groups.length}</div>
          </div>
          {props.session?.user?.id === props.userId &&
            <button className={styles.button} onClick={openDialog} >
              <AiOutlinePlus className="dark:fill-blue" size={35}></AiOutlinePlus>
            </button>}
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.iconSearch}>
            <FiSearch size={20} />
          </span>
          <input type="text" className={styles.inputSearch} placeholder={props.local.search.searchGroup} onChange={(e) => { changeSearch(e) }} value={search} />
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cards}>
            {groups.map((group: any, index) => {
              if (index <= count)
                return (<Card key={group.id + Object.entries(group.users).length} group={group} getGroups={getGroups} session={props.session}></Card>)
            })}
          </div>
          <button className={styles.buttonLoadMore} onClick={() => setCount(count + 4)}>{props.local.button.uploadMore}</button>
        </div>
      </div>
      <dialog className={styles.dialog} id='createGroupDialog'>
        {<CreateGroup getGroups={getGroups} local={props.local}></CreateGroup>}
      </dialog>

    </>
  )
}