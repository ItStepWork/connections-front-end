import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GroupService } from '../../../../../services/group.service';
import styles from './styles.module.scss';

export function EditGroup(props: any) {
    const options = [
        {
            label: "Открытая",
            value: '0',
        },
        {
            label: "Закрытая",
            value: '1',
        },
    ];
    const closeDialog = () => {
        var dialog: any = document.getElementById("editGroupDialog")
        dialog?.close();
    }
    // Toasts Alerts
    const notifyErrorServer = () => toast.warning("Ошибка сервера!", {});
    const notifyInfo = () => toast.info("Параметры не внесены!", {});
    const notifySuccess = (text: string) => toast.success(text, {});
    // const { data: session, update } = useSession();
    const router = useRouter();
    const deleteGroup = async () => {
        props.groupSocket.close();
        let result = await GroupService.deleteGroup(props.group.id);
        if (result === null) notifyErrorServer()
        else {
            notifySuccess("Группа удалена")
            router.push("/main")
        }
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data: any) => {
        let formData = new FormData();
        formData.append("id", props.group.id);
        formData.append("name", data.name);
        formData.append("audience", data.audience);
        formData.append("description", data.description);
        let result = await GroupService.updateGroup(formData);
        (result === null) ? notifyErrorServer() : notifySuccess("Параметры сохранены!");
        props.getGroup();
        closeDialog();
    }
    return (
        <>
            <form className={styles.dialogDiv} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.dialogDivHeader}>
                    <h2 className={styles.h2}>Изменить группу</h2>
                    <button type="button" className={styles.closeButton} onClick={() => { closeDialog(), notifyInfo() }}>
                        <AiOutlineClose size={16}></AiOutlineClose>
                    </button>
                </div>
                <div className={styles.dialogDivBody}>
                    <div className="mb-3">
                        <label className={styles.label}>Название группы</label>
                        <br></br>
                        <input type="text" className={styles.grInput} defaultValue={props.group.name} placeholder="Имя группы здесь..." {...register('name')} required></input>
                    </div>

                    <div >
                        <label className={styles.label}>Тип группы</label>
                        <div className={styles.checkDiv}>
                            <select {...props.group.audience == "Private" ? { defaultValue: "1" } : { defaultValue: "0" }}
                                className={styles.select}
                                id="audience"
                                {...register('audience')}
                                key={props.group.id}
                            >
                                {options.map((option, index) => (
                                    <option key={index} value={option.value} typeof="number">{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className={styles.label}>Описание группы </label>
                        <textarea className={styles.grInput} rows={2} defaultValue={props.group.description} placeholder="Ваше описание здесь..." {...register('description')} required></textarea>
                    </div>
                </div>
                <div className={styles.dialogDivFooter}>
                    <button type="submit" className={styles.greenButton}>Изменить</button>
                    <button type="button" className={styles.redButton} onClick={deleteGroup}>Удалить группу</button>
                </div>
            </form>
        </>
    )
}