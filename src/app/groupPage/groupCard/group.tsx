"use client"
import { AddPost } from '@/components/main/addPost/addPost'
import { LeftBlockFooter } from '@/components/main/leftBlockFooter/leftBlockFooter'
import { LeftUserBlock } from '@/components/main/leftUserBlock/leftUserBlock'
import { News } from '@/components/main/news/news'
import { Stories } from '@/components/main/stories/stories'
import { GroupsCard } from '@/components/userProfile/groupsCard/groupsCard'
import { useState, useEffect } from 'react'
import { GroupCard } from '../groupCard/groupCard'
import styles from './styles.module.scss';
import { GroupService } from '@/services/group.service';


export default function Group(props: any) {
    // const router = useRouter();
    const [group, setGroup] = useState<any>(null);
    useEffect(() => {
        getGroup();
    }, []);
    const [component, setComponent] = useState("");
    const ChangeComponent = () => {
        if (component === "groups") return (<GroupsCard />)
        else if (group !== null) return (<GroupCard group={group} />)
    }
    const getGroup = async () => {
        let result = await GroupService.getGroup(props.id);
        setGroup(result);
    }
    return (
        <>
            <main className={styles.container}>

                <div className={"main__left"}>
                    <LeftUserBlock setComponent={setComponent} />
                    <LeftBlockFooter />
                </div>
                <div className={styles.rightContainer}>

                    {ChangeComponent()}
                    <AddPost />

                </div>

            </main>
        </>
    )
}
