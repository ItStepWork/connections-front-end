"use client"
import { GroupService } from '@/services/group.service';
import { useEffect, useState } from "react";
import { AboutCard } from './aboutBlock/aboutCard';
import { HeaderBlock } from './headerBlock/headerBlock';
import styles from './styles.module.scss';
import { PostPanel } from '../main/postPanel/postPanel';
import { ConnectionsCard } from './connectionsCard/connectionsCard';
import { getSession } from 'next-auth/react';

export default function Group(props: any) {
    const [component, setComponent] = useState("");
    const [users, setUsers] = useState<any[]>([])
    const [group, setGroup] = useState<any>(null);
    const [session, setSession] = useState<any>()
    let GetSession = async () => {
        const result = await getSession();
        setSession(result);
    }
    useEffect(() => {
        GetData();
        GetSession();
    }, []);
    let GetData = async () => {
        let result = await GroupService.getGroup(props.id);
        await setGroup(result);
        let result1 = await GroupService.getUsersGroup(result?.id);
        setUsers(result1);
    }
    const GetGroup = async () => {
        let result = await GroupService.getGroup(props.id);
        setGroup(result);
    }
    let GetUsers = async () => {
        let result = await GroupService.getUsersGroup(group?.id);
        setUsers(result);
    }
    const ChangeComponent = () => {
        if (component === "connections") return (<ConnectionsCard session={session} users={users} group={group} GetGroup={GetGroup} GetUsers={GetUsers} />)
        if (component === "about") return (<AboutCard group={group} />)
        else return (<>Empty</>)
    }
    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    {group
                        ? <div className='gap-5'>
                            < HeaderBlock session={session} group={group} users={users} GetGroup={GetGroup} GetUsers={GetUsers} setComponent={setComponent} />
                            <PostPanel></PostPanel>
                            {ChangeComponent()}
                        </div>
                        : <>Loading...</>
                    }
                </div>
            </main>
        </>
    )
}
