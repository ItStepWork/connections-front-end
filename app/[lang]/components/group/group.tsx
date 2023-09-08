"use client"

import { getSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { GroupService } from '../../../../services/group.service';
import { AboutCard } from './aboutBlock/aboutCard';
import { ConnectionsCard } from './connectionsCard/connectionsCard';
import { HeaderBlock } from './headerBlock/headerBlock';
import Photos from './photos/page';
import { PostsCard } from './postsCard/postsCard';
import styles from './styles.module.scss';
import { randomInt } from 'crypto';

export default function Group(props: any) {
    const [id, setId] = useState(0)
    const [groupSocket, setGroupSocket] = useState<WebSocket>()
    const [component, setComponent] = useState("about");
    const [usersRequests, setUsersRequests] = useState<any[]>([])
    const [membersFriends, setMembersFriends] = useState<any[]>([])
    const [group, setGroup] = useState<any>(null);
    const [session, setSession] = useState<any>()
    const [photos, setPhotos] = useState<any[]>([]);
    let getUserSession = async () => {
        const result = await getSession();
        setSession(result);
    }
    useEffect(() => {
        getData();
        getUserSession();
        getPhotos();
        subscribe();
    }, []);
    const getData = async () => {
        let result = await GroupService.getGroup(props.id);
        await setGroup(result);
        let result2 = await GroupService.getRequestsToGroup(result?.id);
        await setUsersRequests(result2);
        let result3 = await GroupService.getFriendsInGroup(props.id);
        setMembersFriends(result3);
    }
    const getGroup = async () => {
        let result = await GroupService.getGroup(props.id);
        setGroup(result);
    }
    const getUsersRequests = async () => {
        let result = await GroupService.getRequestsToGroup(props.id);
        setUsersRequests(result);
    }
    const getFriendsInGroup = async () => {
        let result = await GroupService.getFriendsInGroup(props.id);
        setMembersFriends(result);
    }
    const getUsers = async () => {
        await getUsersRequests();
        await getFriendsInGroup();
        setId(Math.random())
    }
    const subscribe = async () => {
        let session = await getSession();
        if (session != null) {
            let grpSocket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToGroupUpdates?id=${props.id}`, ["client", session.user.accessToken]);
            setGroupSocket(grpSocket);
            grpSocket.addEventListener('message', (event) => {
                getUsers();
                getGroup();
            });
            let friendSocket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToFriendsUpdates`, ["client", session.user.accessToken]);
            friendSocket.addEventListener('message', (event) => {
                getUsers();
                getGroup();
            });
            setInterval(() => {
                friendSocket.send("ping");
                grpSocket.send("ping");
            }, 30000);
        }
    }

    const getPhotos = async () => {
        let result2 = await GroupService.getPhotos(props.id);
        setPhotos(result2);
    }
    const changeComponent = () => {
        if (component === "members") return (<ConnectionsCard key={"members" + membersFriends.length + id} isRequests={false} session={session} users={membersFriends} group={group} getGroup={getGroup} getUsers={getUsers} />)
        else if (component === "requests") return (<ConnectionsCard key={"requests" + usersRequests.length + id} isRequests={true} session={session} users={usersRequests} group={group} getGroup={getGroup} getUsers={getUsers} />)
        else if (component === "about") return (<AboutCard group={group} members={Object.entries(membersFriends).length} />)
        else if (component === "posts") return (<PostsCard />)
        else if (component === "photo") return (<Photos group={group} session={session} getPhotos={getPhotos} photos={photos} />)
        else return (<> "Блядська рука кремля"</>)
    }
    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    {group
                        ? <div className='gap-5'>
                            < HeaderBlock groupSocket={groupSocket} session={session} group={group} usersRequests={usersRequests} members={membersFriends} getGroup={getGroup} getUsers={getUsers} component={component} setComponent={setComponent} />
                            {changeComponent()}
                        </div>
                        : <>Loading...</>
                    }
                </div>
            </main>
        </>
    )
}
