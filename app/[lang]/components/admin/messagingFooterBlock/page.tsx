"use client"
import { useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { FaRegWindowClose } from 'react-icons/fa';
import { ImAttachment } from 'react-icons/im';
import styles from './styles.module.scss';
import DropDownEmoji from '../../messaging/dropDownEmoji/page';
import { AdminService } from '../../../../../services/admin.service';

export default function MessagingFooterBlock(props: any) {

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const saveFile = (e: any) => {
    if (e.target.files[0].name.endsWith('.jpg') || e.target.files[0].name.endsWith('.jpeg') || e.target.files[0].name.endsWith('.png')) {
      setFile(e.target.files[0]);
    }
  }

  const click = async () => {
    if (props.userId !== undefined) {
      const formData = new FormData();
      formData.append("userId", props.userId);
      formData.append("text", text);
      if (file !== null) formData.append("file", file);
      await AdminService.sendSupportMessage(formData);

      setText("");
      setFile(null);

      if (props.loadMessages !== undefined) props.loadMessages(props.userId);
      if (props.loadDialogs !== undefined) props.loadDialogs();
    }
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
          <div className='flex flex-col w-11/12'>
            {file ? (<div className='flex text-sm'>Прикреплён файл<button onClick={() => { setFile(null) }}><FaRegWindowClose className="m-1 fill-red-500 hover:fill-red-700" /></button></div>) : (<></>)}
            <textarea className={styles.textarea} onChange={handleChange} value={text}></textarea>
          </div>

          <div className={styles.buttonContainer}>
            <div className='mx-1'>
              <DropDownEmoji addEmoji={addEmoji} isLower={false} />
            </div>
            <div className='mx-1 my-0.5'>
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center  border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center px-2 py-1">
                  <ImAttachment className="fill-black dark:fill-white" />
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={saveFile} />
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