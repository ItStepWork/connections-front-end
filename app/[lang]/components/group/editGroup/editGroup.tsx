import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GroupService } from '../../../../../services/group.service';
import styles from './styles.module.scss';

export function EditGroup(props: any) {

    const {
        groupSocket,
        group,
        getGroup,
        local,
        lang
    } = props;

    const options = [
        {
            label: local.editGroup.privacy.public,
            value: '0',
        },
        {
            label: local.editGroup.privacy.private,
            value: '1',
        },
    ];
    const closeDialog = () => {
        var dialog: any = document.getElementById("editGroupDialog")
        dialog?.close();
    }
    // Toasts Alerts
    const notifyErrorServer = () => toast.warning(local.editGroup.toasts.error, {});
    const notifyInfo = () => toast.info(local.editGroup.toasts.warning, {});
    const notifySuccess = (text: string) => toast.success(text, {});
    const router = useRouter();
    const deleteGroup = async () => {
        // groupSocket.close();
        let result = await GroupService.deleteGroup(group.id);
        if (result === null) notifyErrorServer()
        else {
            notifySuccess(local.editGroup.toasts.delete)
            router.push(`/${lang}/main`)
        }
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data: any) => {
        let formData = new FormData();
        formData.append("id", group.id);
        formData.append("name", data.name);
        formData.append("audience", data.audience);
        formData.append("email", data.email);
        formData.append("description", data.description);
        let result = await GroupService.updateGroup(formData);
        (result === null) ? notifyErrorServer() : notifySuccess(local.editGroup.toasts.ok);
        getGroup();
        closeDialog();
    }
    return (
        <>
            <form className={styles.dialogDiv} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.dialogDivHeader}>
                    <h2 className={styles.h2}>{local.editGroup.title}</h2>
                    <button type="button" className={styles.closeButton} onClick={() => { closeDialog(), notifyInfo() }}>
                        <AiOutlineClose size={16}></AiOutlineClose>
                    </button>
                </div>
                <div className={styles.dialogDivBody}>
                    <div className="mb-3">
                        <label className={styles.label}>{local.editGroup.name}</label>
                        <br></br>
                        <input type="text" className={styles.grInput} defaultValue={group.name} placeholder="Имя группы здесь..." {...register('name')} required></input>
                    </div>

                    <div >
                        <label className={styles.label}>{local.editGroup.privacy.title}</label>
                        <div className={styles.checkDiv}>
                            <select {...group.audience == "Private" ? { defaultValue: "1" } : { defaultValue: "0" }}
                                className={styles.select}
                                id="audience"
                                {...register('audience')}
                                key={group.id}
                            >
                                {options.map((option, index) => (
                                    <option key={index} value={option.value} typeof="number">{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className={styles.label}>Email</label>
                        <br></br>
                        <input type="email" className={styles.grInput} defaultValue={group.email} placeholder="Email..." {...register('email')} required></input>
                    </div>
                    <div className="mb-3">
                        <label className={styles.label}>{local.editGroup.description}</label>
                        <textarea className={styles.grInput} rows={2} defaultValue={group.description} placeholder="Ваше описание здесь..." {...register('description')} required></textarea>
                    </div>
                </div>
                <div className={styles.dialogDivFooter}>
                    <button type="submit" className={styles.greenButton}>{local.editGroup.changeBtn}</button>
                    <button type="button" className={styles.redButton} onClick={deleteGroup}>{local.editGroup.deleteBtn}</button>
                </div>
            </form>
        </>
    )
}