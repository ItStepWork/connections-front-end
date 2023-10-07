'use client'

import { useEffect, useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { CreateGroup } from '../../../../../app/[lang]/components/userProfile/groupsCard/createGroup/createGroup';
import { GroupService } from '../../../../../services/group.service';
import { SubscriptionService } from '../../../../../services/subscription.service';
import { Card } from './card';
import styles from './groupsCard.module.scss';

export function GroupsCard(props: any) {

  const [groups, setGroups] = useState([]);

  const [count, setCount] = useState(3);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getGroups();
    return SubscriptionService.subscribeToChannel(props.session.user.accessToken, `Subscription/SubscribeToGroupsUpdates`, getGroups);
  }, []);
  const getGroups = async () => {
    let result = await GroupService.getGroups(props.userId);
    setGroups(result);
  }
  const openDialog = () => {
    var dialog: any = document.getElementById("createGroupDialog")
    dialog?.showModal();
  }
  const changeSearch = (event: any) => {
    setCount(3);
    setSearch(event.target.value);
  }
  const filter = (array: any[]) => {
    return array.filter((g: any) => g.name?.toLowerCase().includes(search.toLowerCase()));
  }

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
              <AiOutlineUsergroupAdd className="dark:fill-blue" size={35}></AiOutlineUsergroupAdd>
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
            {filter(groups).map((group: any, index) => {
              if (index <= count)
                return (<Card key={group.id + Object.entries(group.users).length} group={group} getGroups={getGroups} session={props.session} local={props.local}></Card>)
            })}
          </div>
          {count < groups.length - 1 && <button className={styles.buttonLoadMore} onClick={() => setCount(count + 4)}>{props.local.button.uploadMore}</button>}
        </div>
      </div>
      <dialog className={styles.dialog} id='createGroupDialog'>
        {<CreateGroup getGroups={getGroups} local={props.local}></CreateGroup>}
      </dialog>

    </>
  )
}