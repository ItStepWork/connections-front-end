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
import { getDictionary } from '../../../../locale-dictionary';

export function GroupPage(props: any) {
    const [id, setId] = useState(0)
    const [groupSocket, setGroupSocket] = useState<WebSocket>()
    const [component, setComponent] = useState("about");
    const [usersRequests, setUsersRequests] = useState<any[]>([])
    const [membersFriends, setMembersFriends] = useState<any[]>([])
    const [group, setGroup] = useState<any>(null);
    const [friendsForInvitation, setFriendsForInvitation] = useState<any>()
    const [photos, setPhotos] = useState<any[]>([]);
    // let getUserSession = async () => {
    //     const result = await getSession();
    //     setSession(result);
    // }
    useEffect(() => {
        getData();
        // getUserSession();
        getPhotos();
        // subscribe();
        let grpSocket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToGroupUpdates?id=${props.id}`, ["client", props.session.user.accessToken]);
        let friendSocket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToFriendsUpdates`, ["client", props.session.user.accessToken]);
        grpSocket.addEventListener('message', async (event) => {
            await getUsers()
            await getGroup();
            // getUserSession();
            await getPhotos();

        });
        friendSocket.addEventListener('message', async (event) => {
            await getUsers();
            await getGroup()
            // getUserSession();
            // getPhotos();
        });
        let grpIntervalId = setInterval(() => {
            if (grpSocket.OPEN) grpSocket.send("ping");
            else clearInterval(grpIntervalId);
        }, 30000);
        let frndIntervalId = setInterval(() => {
            if (friendSocket.OPEN) friendSocket.send("ping");
            else clearInterval(frndIntervalId);
        }, 30000);
        return () => {
            setInterval(() => {
                if (grpSocket.OPEN) grpSocket.close();
                if (friendSocket.OPEN) friendSocket.close();
            }, 1000)
            clearInterval(grpIntervalId);
            clearInterval(frndIntervalId);
        };
    }, []);
    const getData = async () => {
        let result = await GroupService.getGroup(props.id);
        await setGroup(result);
        let result2 = await GroupService.getRequestsToGroup(result?.id);
        await setUsersRequests(result2);
        let result3 = await GroupService.getFriendsInGroup(props.id);
        setMembersFriends(result3);
        let result4 = await GroupService.getFriendsForInvitation(props.id);
        setFriendsForInvitation(result4);
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
    const getFriendsForInvitation = async () => {
        let result = await GroupService.getFriendsForInvitation(props.id);
        setFriendsForInvitation(result);
    }
    const getUsers = async () => {
        await getUsersRequests();
        await getFriendsInGroup();
        await getFriendsForInvitation();
        setId(Math.random())
    }

    const getPhotos = async () => {
        let result2 = await GroupService.getPhotos(props.id);
        setPhotos(result2);
    }
    const changeComponent = () => {
        if (component === "members") return (<ConnectionsCard key={"members" + membersFriends.length + id} isRequests={false} session={props.session} users={membersFriends} group={group} getGroup={getGroup} getUsers={getUsers} local={props.local} />)
        else if (component === "requests") return (<ConnectionsCard key={"requests" + usersRequests.length + id} isRequests={true} session={props.session} users={usersRequests} group={group} getGroup={getGroup} getUsers={getUsers} local={props.local} />)
        else if (component === "about") return (<AboutCard group={group} members={Object.entries(membersFriends).length} local={props.local} />)
        else if (component === "posts") return (<PostsCard local={props.local} />)
        else if (component === "photo") return (<Photos group={group} session={props.session} getPhotos={getPhotos} photos={photos} local={props.local} />)
        else return (<> "Блядська рука кремля"</>)
    }
    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    {group
                        ? <div className='gap-5'>
                            < HeaderBlock groupSocket={groupSocket} session={props.session} group={group} usersRequests={usersRequests} members={membersFriends}
                                getGroup={getGroup} getUsers={getUsers} component={component} setComponent={setComponent} local={props.local} friendsForInvitation={friendsForInvitation} getFriendsForInvitation={getFriendsForInvitation} />
                            {changeComponent()}
                        </div>
                        : <>Loading...</>
                    }
                </div>
            </main>
        </>
    )
}
export default function Group(props: any) {
    const [session, setSession] = useState<any>()
    const getUserSession = async () => {
        const result = await getSession();
        setSession(result);
    }
    useEffect(() => {
        getUserSession();
    }, [])
    return (
        <>
            {session && <GroupPage session={session} local={props.local} id={props.id} />}
        </>
    )
}
