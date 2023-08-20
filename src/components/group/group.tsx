"use client"
import { GroupService } from '@/services/group.service';
import { useEffect, useState } from "react";
import { AboutCard } from './aboutBlock/aboutCard';
import { HeaderBlock } from './headerBlock/headerBlock';
import styles from './styles.module.scss';

export default function Group(props: any) {
    const [group, setGroup] = useState<any>(null);
    useEffect(() => {
        getGroup();
    }, []);
    const getGroup = async () => {
        let result = await GroupService.getGroup(props.id);
        setGroup(result);
    }
    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    {group ? <HeaderBlock group={group} getGroup={getGroup} />
                        : <>Loading...</>
                    }
                </div>
                {/* <div className={styles.rightContainer}>
                    <AboutCard group={group}></AboutCard>
                </div> */}

            </main>
        </>
    )
}
