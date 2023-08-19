"use client"
import { AddPost } from '@/components/main/addPost/addPost'
import { LeftBlockFooter } from '@/components/main/leftBlockFooter/leftBlockFooter'
import { LeftUserBlock } from '@/components/main/leftUserBlock/leftUserBlock'
import { News } from '@/components/main/news/news'
import { Stories } from '@/components/main/stories/stories'
import { GroupsCard } from '@/components/userProfile/groupsCard/groupsCard'
import { useState, useEffect } from 'react'
import { GroupCard } from './headerBlock/headerBlock'
import styles from './styles.module.scss';
import { GroupService } from '@/services/group.service';
import { AboutCard } from './aboutBlock/aboutCard'

export default function Group(props: any) {
    const [group, setGroup] = useState<any>(null);
    useEffect(() => {
        getGroup();
    }, []);
    const [component, setComponent] = useState("");
    const ChangeComponent = () => {
        if (component === "groups") return (<GroupsCard />)
        else if (group !== null) return (<GroupCard group={group} getGroup={getGroup} />)
    }
    const getGroup = async () => {
        let result = await GroupService.getGroup(props.id);
        setGroup(result);
    }
    return (
        <>
            <main className={styles.container}>

                <div className={styles.leftContainer + " mt-20"}>
                    {/* <LeftUserBlock setComponent={setComponent} />
                    <LeftBlockFooter /> */}
                    {ChangeComponent()}
                </div>
                <div className={styles.rightContainer}>
                    <AboutCard group={group}></AboutCard>

                    {/* <AddPost /> */}

                </div>

            </main>
        </>
    )
}
