"use client"

import { useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { FaRegWindowClose } from 'react-icons/fa';
import { ImAttachment } from 'react-icons/im';
import { toast } from 'react-toastify';
import { FileFormats } from '../../../../../enums/all.enum';
import { CheckService } from '../../../../../services/check.service';
import { PostService } from '../../../../../services/post.service';
import DropDownEmoji from '../../messaging/dropDownEmoji/page';
import styles from './styles.module.scss';

export default function CreatePost(props: any) {

  const {
    local,
    placeholder,
    userId
   } = props;

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const notifyError = () => toast.error(local.createGroup.toasts.format, {});

  const saveFile = (e: any) => {
    if (CheckService.imageFormat(e.target.files[0].name))
      setFile(e.target.files[0]);
    else notifyError()
  }

  const click = async () => {
    const formData = new FormData();
    if(props.userId != undefined) formData.append("recipientId", userId);
    if(props.groupId != undefined) formData.append("groupId", props.groupId);
    formData.append("text", text);
    if (file !== null) formData.append("file", file);
    await PostService.createPost(formData);
    setText("");
    setFile(null);
  }

  function handleChange(event: any) {
    setText(event.target.value);
  }

  function addEmoji(emoji: any) {
    setText(text + emoji);
  }

  return (
    <>
      <div className={styles.verticalContainer}>
        <div className={styles.fileContainer}>
          {file 
          ? (<div 
              className={styles.fileText}>{local.posts.file}
              <button onClick={() => { setFile(null) }}>
                <FaRegWindowClose className={styles.fileIcon} />
              </button>
            </div>) 
          : (<></>)}
          <textarea className={styles.textarea} placeholder={placeholder} onChange={handleChange} value={text}></textarea>
        </div>

        <div className={styles.buttonContainer}>
          <div className='mx-1'>
            <DropDownEmoji addEmoji={addEmoji} isLower={false} />
          </div>
          <div className={styles.fileInputContainer}>
            <label >
              <div className={styles.iconContainer}>
                <ImAttachment className={styles.icon} />
              </div>
              <input type="file" accept={FileFormats.All} className="hidden" onChange={saveFile} />
            </label>
          </div>
          <div className='mx-1'>
            <button className={styles.button} onClick={click}>
              <BsFillSendFill className='fill-white' />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}