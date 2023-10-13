"use client"
import { getSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ComponentName } from '../../../../enums/all.enum';
import { GroupService } from '../../../../services/group.service';
import { SubscriptionService } from '../../../../services/subscription.service';
import { useMainComponents } from '../../../../stores/mainStateStore';
import Posts from '../posts/page';
import { AboutCard } from './aboutBlock/aboutCard';
import { ConnectionsCard } from './connectionsCard/connectionsCard';
import { HeaderBlock } from './headerBlock/headerBlock';
import Photos from './photos/page';
import styles from './styles.module.scss';

export function GroupPage(props: any) {

    const {
        id,
        local,
        session,
        lang
    } = props;

    const [idMember, setIdMember] = useState(0)
    const [groupSocket, setGroupSocket] = useState<WebSocket>()
    const [component, setComponent] = useMainComponents((state) => [state.groupComponentName, state.setGroupComponent]);
    const [usersRequests, setUsersRequests] = useState<any[]>([])
    const [membersFriends, setMembersFriends] = useState<any[]>([])
    const [group, setGroup] = useState<any>(null);
    const [friendsForInvitation, setFriendsForInvitation] = useState<any>()
    const [photos, setPhotos] = useState<any[]>([]);
    useEffect(() => {
        getData();
        getPhotos();
        return SubscriptionService.subscribeToChannels(session.user.accessToken, [
            { path: `Subscription/SubscribeToGroupUpdates?id=${id}`, func: async () => { await getUsers(); await getGroup(); await getPhotos(); } },
            { path: `Subscription/SubscribeToFriendsUpdates`, func: async () => { await getUsers(); await getGroup(); } }
        ]);
    }, []);
    const getData = async () => {
        let result = await GroupService.getGroup(id);
        await setGroup(result);
        let result2 = await GroupService.getRequestsToGroup(result?.id);
        await setUsersRequests(result2);
        let result3 = await GroupService.getFriendsInGroup(id);
        setMembersFriends(result3);
        let result4 = await GroupService.getFriendsForInvitation(id);
        setFriendsForInvitation(result4);
    }
    const getGroup = async () => {
        let result = await GroupService.getGroup(id);
        setGroup(result);
    }
    const getUsersRequests = async () => {
        let result = await GroupService.getRequestsToGroup(id);
        setUsersRequests(result);
    }
    const getFriendsInGroup = async () => {
        let result = await GroupService.getFriendsInGroup(id);
        setMembersFriends(result);
    }
    const getFriendsForInvitation = async () => {
        let result = await GroupService.getFriendsForInvitation(id);
        setFriendsForInvitation(result);
    }
    const getUsers = async () => {
        await getUsersRequests();
        await getFriendsInGroup();
        await getFriendsForInvitation();
        setIdMember(Math.random())
    }

    const getPhotos = async () => {
        let result2 = await GroupService.getPhotos(id);
        setPhotos(result2);
    }
    const changeComponent = () => {
        if (component === ComponentName.Members) return (<ConnectionsCard key={"members" + membersFriends.length + idMember} isRequests={false} session={session} users={membersFriends} group={group} getGroup={getGroup} getUsers={getUsers} local={local} />)
        else if (component === ComponentName.Requests) return (<ConnectionsCard key={"requests" + usersRequests.length + idMember} isRequests={true} session={session} users={usersRequests} group={group} getGroup={getGroup} getUsers={getUsers} local={local} />)
        else if (component === ComponentName.AboutGroup) return (<AboutCard group={group} members={Object.entries(membersFriends).length} local={local} />)
        else if (component === ComponentName.Photos) return (<Photos group={group} session={session} getPhotos={getPhotos} photos={photos} local={local} />)
        else if (component === ComponentName.Posts) return (<Posts local={local} session={session} myId={session.user.id} groupId={id[0]} />)
        else return (<></>)
    }
    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    {group
                        && <div className='gap-5'>
                            < HeaderBlock 
                                groupSocket={groupSocket} 
                                session={session} 
                                group={group} 
                                usersRequests={usersRequests} 
                                members={membersFriends}
                                getGroup={getGroup} 
                                getUsers={getUsers} 
                                component={component} 
                                setComponent={setComponent} 
                                local={local} 
                                friendsForInvitation={friendsForInvitation} 
                                getFriendsForInvitation={getFriendsForInvitation} 
                                lang={lang}/>
                            {changeComponent()}
                        </div>
                    }
                </div>
            </main>
        </>
    )
}
export default function Group(props: any) {

    const {
        id,
        local,
        lang
    } = props;

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
            {session && <GroupPage session={session} local={local} id={id} lang={lang}/>}
        </>
    )
}
