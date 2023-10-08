import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from 'react-icons/ai';
import { BsUpload } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FileFormats } from "../../../../../../enums/all.enum";
import { CheckService } from "../../../../../../services/check.service";
import { GroupService } from '../../../../../../services/group.service';
import styles from './styles.module.scss';

export function CreateGroup(props: any) {

    const {
        local
    } = props;

    const [avatar, setAvatar] = useState<any>(null);
    const options = [
        {
            label: local.createGroup.open,
            value: '0',
        },
        {
            label: local.createGroup.closed,
            value: '1',
        },
    ];
    const closeDialog = () => {
        var dialog: any = document.getElementById("createGroupDialog")
        dialog?.close();
    }
    const notifyError = () => toast.error(local.createGroup.toasts.format, {});
    const notifyErrorServer = () => toast.error(local.createGroup.toasts.error, {});
    const notifySuccess = () => toast.success(local.createGroup.toasts.ok, {});
    const { data: session, update } = useSession();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data: any) => {
        if (CheckService.imageFormat(data.file[0].name)) {
            let formData = new FormData();
            formData.append("file", data.file[0]);
            formData.append("name", data.name);
            formData.append("audience", data.audience);
            formData.append("description", data.description);
            let result = await GroupService.addGroup(formData);
            if (result === null) notifyErrorServer();
            else notifySuccess();
            closeDialog();
        }
        else notifyError();
    }
    return (
        <>
            <form className={styles.dialogDiv} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.dialogDivHeader}>
                    <h2 className={styles.h2}>{local.createGroup.title}</h2>
                    <button type="button" className={styles.closeButton} onClick={closeDialog}>
                        <AiOutlineClose size={16}></AiOutlineClose>
                    </button>
                </div>
                <div className={styles.dialogDivBody}>
                    <div className="mb-3">
                        <label className={styles.label}>{local.createGroup.name}</label>
                        <br></br>
                        <input type="text" className={styles.grInput} placeholder={local.createGroup.placeholderName} {...register('name')} required></input>
                    </div>
                    <div className="mb-3 ">
                        <label className={styles.label}>{local.createGroup.image}</label>
                        <div className={styles.dialogDivHeader}>
                            <div className={styles.input_div}>
                                <input className={styles.input} type="file" accept={FileFormats.All} {...register('file')} required onChange={(e: any) => { setAvatar(e.target.files[0]) }}></input>
                                {(avatar === null || avatar === undefined) ? (<BsUpload size={36} className="dark:fill-white" ></BsUpload>) : (<img src={URL.createObjectURL(avatar)} ></img>)}
                            </div>
                        </div>
                    </div>
                    <label className={styles.label}>{local.createGroup.type}</label>
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
                    <div className="mb-3 mt-3">
                        <label className={styles.label}>{local.createGroup.description}</label>
                        <textarea className={styles.grInput} rows={2} placeholder={local.createGroup.placeholderDesc} {...register('description')} required></textarea>
                    </div>
                </div>
                <div className={styles.dialogDivFooter}>
                    <button type="submit" className={styles.greenButton}>{local.button.create}</button>
                </div>
            </form>

        </>
    )
}