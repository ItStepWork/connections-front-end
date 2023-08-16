import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import styles from './styles.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { GroupService } from '@/services/group.service';
import { useState } from "react";

export function CreateGroup(props: any) {
    const [avatar, setAvatar] = useState<any>(null);
    const options = [
        {
            label: "Public",
            value: '0',
        },
        {
            label: "Private",
            value: '1',
        },
    ];
    const closeDialog = () => { document.querySelector("dialog")?.close(); }
    const { data: session, update } = useSession();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data: any) => {
        if( data.file[0].name.endsWith('.jpg') ||  data.file[0].name.endsWith('.jpeg') ||  data.file[0].name.endsWith('.png')){
            let formData = new FormData();
            formData.append("file", data.file[0]);
            formData.append("name", data.name);
            formData.append("audience", data.audience);
            formData.append("description", data.description);
            let result = await GroupService.addGroup(formData);
            alert(result.statusText);
            props.getGroups();
            closeDialog();
        }
        else alert("Wrong picture format");
       
    }
    return (
        <>
            <form className={styles.dialogDiv} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.dialogDivHeader}>
                    <h2 className={styles.h2}>Create Group</h2>
                    <button type="button" className={styles.closeButton} onClick={closeDialog}>
                        <AiOutlineClose size={16}></AiOutlineClose>
                    </button>
                </div>
                <div className={styles.dialogDivBody}>
                    <div className="mb-3">
                        <label className={styles.label}>Group name</label>
                        <br></br>
                        <input type="text" className={styles.grInput} placeholder="Add Group name here" {...register('name')} required></input>
                    </div>
                    <div className="mb-3">
                        <label className={styles.label}>Group picture</label>
                        <div className={styles.dialogDivHeader}>
                            <div className="input-div">
                                <input className="input" type="file" accept=".jpg, .jpeg, .png" {...register('file')} required onChange={(e: any) => { setAvatar(e.target.files[0]) }}></input>
                                {(avatar === null||avatar===undefined) ? (<FaRegUser size={36} className="dark:fill-white" ></FaRegUser>) : (<img src={URL.createObjectURL(avatar)} ></img>)}
                            </div>
                            {/* <div className="avatar-remove">
                                <button type="button" id="avatar-reset-img" className={styles.grayButton} onClick={() => {
                                    setAvatar(null);
                                }}>Delete</button>
                            </div> */}
                        </div>
                    </div>
                    <div >
                        <label className={styles.label}>Select audience</label>
                        <div className={styles.checkDiv}>
                            <select
                                className={styles.select}
                                id="audience"
                                {...register('audience')}
                                key={session?.user?.id}
                            >
                                {options.map((option, index) => (
                                    <option key={index} value={option.value} typeof="number">{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* <div className="mb-3">
                  <label className="form-label">Invite friend </label>
                  <input type="text" className={styles.grInput} placeholder="Add friend name here"></input>
                </div> */}
                    <div className="mb-3">
                        <label className={styles.label}>Group description </label>
                        <textarea className={styles.grInput} rows={2} placeholder="Description here" {...register('description')} required></textarea>
                    </div>
                </div>
                <div className={styles.dialogDivFooter}>
                    <button type="submit" className={styles.greenButton}>Create now</button>
                </div>
            </form>
        </>
    )
}