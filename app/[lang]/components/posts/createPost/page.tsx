"use client"

import { useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { FaRegWindowClose } from 'react-icons/fa';
import { ImAttachment } from 'react-icons/im';
import { FileFormats } from '../../../../../enums/all.enum';
import { PostService } from '../../../../../services/post.service';
import DropDownEmoji from '../../messaging/dropDownEmoji/page';
import styles from './styles.module.scss';
import { CheckService } from '../../../../../services/check.service';
import { toast } from 'react-toastify';

export default function CreatePost(props: any) {

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const notifyError = () => toast.error(props.local.createGroup.toasts.format, {});

  const saveFile = (e: any) => {
    if (CheckService.imageFormat(e.target.files[0].name))
      setFile(e.target.files[0]);
    else notifyError()
  }

  const click = async () => {
    const formData = new FormData();
    formData.append("recipientId", props.userId);
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
      <div className={styles.container}>
        <div className={styles.verticalContainer}>
          <div className={styles.fileContainer}>
            {file ? (<div className={styles.fileText}>{props.local.posts.file}<button onClick={() => { setFile(null) }}><FaRegWindowClose className={styles.fileIcon} /></button></div>) : (<></>)}
            <textarea className={styles.textarea} placeholder={props.local.posts.placeholder} onChange={handleChange} value={text}></textarea>
          </div>

          <div className={styles.buttonContainer}>
            <div className='mx-1'>
              <DropDownEmoji addEmoji={addEmoji} isLower={false} />
            </div>
            <div className={styles.fileInputContainer}>
              <label htmlFor="dropzone-file" >
                <div className={styles.iconContainer}>
                  <ImAttachment className={styles.icon} />
                </div>
                <input id="dropzone-file" type="file" accept={FileFormats.All} className="hidden" onChange={saveFile} />
              </label>
            </div>
            <div className='mx-1'>
              <button className={styles.button} onClick={click}>
                <BsFillSendFill className='fill-white' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}