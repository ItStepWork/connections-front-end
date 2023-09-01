"use client"
import { GroupService } from '@/services/group.service';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { AboutCard } from './aboutBlock/aboutCard';
import { ConnectionsCard } from './connectionsCard/connectionsCard';
import { HeaderBlock } from './headerBlock/headerBlock';
import styles from './styles.module.scss';
import { onChildChanged, ref } from '@firebase/database';
import Firebase from '@/services/firebase.service';
import { PostsCard } from './postsCard/postsCard';
import Photos from './photos/page';

export default function Group(props: any) {
    const [component, setComponent] = useState("about");
    const [members, setMembers] = useState<any[]>([])
    const [usersRequests, setUsersRequests] = useState<any[]>([])
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
        let result1 = await GroupService.getMembersGroup(result?.id);
        await setMembers(result1);
        let result2 = await GroupService.getRequestsToGroup(result?.id);
        await setUsersRequests(result2);
    }
    const getGroup = async () => {
        let result = await GroupService.getGroup(props.id);
        setGroup(result);
    }
    const getMembers = async () => {
        let result = await GroupService.getMembersGroup(group?.id);
        setMembers(result);
    }
    const getUsersRequests = async () => {
        let result = await GroupService.getRequestsToGroup(props.id);
        setUsersRequests(result);
    }
    const getUsers = async () => {
        getMembers();
        getUsersRequests();
    }
    const subscribe = async () => {
        let session = await getSession();
        if (session != null) {
            onChildChanged(ref(Firebase(), `Groups/${group?.id}`), (data) => {
                getUsers();
                getGroup();
            });
        }
    }

    const getPhotos = async () => {
        // let result1 = await GalleryService.getAlbums(props.userId);
        // setAlbums(result1);

        let result2 = await GroupService.getPhotos(props.id);
        setPhotos(result2);
        // console.log(result2)
    }
    // const getUsersArrays = () => {
    //     let resMembers = Object.entries(group.users).filter(([k, v]) => v == true).map(([k, v]) => k);
    //     let resRequests = Object.entries(group.users).filter(([k, v]) => v == false).map(([k, v]) => k);
    //     setMembers(users.filter(i => resMembers.includes(i.id)));
    //     setUsersRequests(users.filter(i => resRequests.includes(i.id)));
    // }
    const changeComponent = () => {
        if (component === "members") return (<ConnectionsCard isRequests={false} session={session} users={members} group={group} getGroup={getGroup} getUsers={getUsers} />)
        else if (component === "requests") return (<ConnectionsCard isRequests={true} session={session} users={usersRequests} group={group} getGroup={getGroup} getUsers={getUsers} />)
        else if (component === "about") return (<AboutCard group={group} members={Object.entries(members).length} />)
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
                            < HeaderBlock session={session} group={group} usersRequests={usersRequests} members={members} getGroup={getGroup} getUsers={getUsers} setComponent={setComponent} />
                            {/* <PostPanel></PostPanel> */}
                            {changeComponent()}
                        </div>
                        : <>Loading...</>
                    }
                </div>
            </main>
        </>
    )
}
