"use client"
import { useState } from "react";
import { AiFillLike } from 'react-icons/ai';
import { BsFillSendFill } from 'react-icons/bs';
import { GalleryService } from '../../../../../services/gallery.service';
import DropDownEmoji from '../../messaging/dropDownEmoji/page';
import Avatar from '../avatar/page';
import Comment from '../comment/page';
import styles from './styles.module.scss';
import Complaint from "../../support/complaint/page";
import { HiDotsVertical } from 'react-icons/hi';

export default function InfoPhoto(props: any) {

  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenComplaint, setIsOpenComplaint] = useState<boolean>(false);

  const like = async () => {
    await GalleryService.setLikePhoto(props.userId, props.photo.id);
  }

  const sendComment = async () => {
    await GalleryService.sendCommentPhoto(props.userId, props.photo.id, text);
    setText("");
  }

  function handleChange(event: any) {
    setText(event.target.value);
  }

  function addEmoji(emoji: any) {
    setText(text + emoji);
  }

  return (
    <>
      <div className="relative w-full flex flex-row flex-nowrap justify-between ">
        <Avatar userId={props.userId} accessToken={props.accessToken} />
        <div className="cursor-pointer" onClick={() => { setIsOpen(!isOpen); }}>
          <HiDotsVertical size={20} {...isOpen ? { className: "mt-3 fill-light_button_BG_hover" } : { className: "mt-3 fill-button_blue_BG" }} />
        </div>
        {isOpen &&
          <div className="absolute z-50 p-3 flex flex-col top-[40px] right-0 items-center bg-white text-gray-900 border border-light_border rounded-lg
            dark:text-dark_text_gray dark:bg-dark_background dark:border-dark_border">
            <div className='cursor-pointer text-dark_text_gray hover:text-button_blue_BG' onClick={ ()=>{setIsOpen(false); setIsOpenComplaint(true); }}>Complain</div>
          </div>
        }
        <Complaint isOpen={isOpenComplaint} setIsOpen={setIsOpenComplaint} userId={props.userId} photoId={props.photo.id} photoUrl={props.photo.url} />
      </div>
      <div className='flex justify-between m-3'>
        {props.photo.likes.includes(props.myId) ? (
          <button onClick={like} className='flex items-center text-button_blue_BG'>
            <AiFillLike className="fill-button_blue_BG" />
            Liked ({props.photo.likes.length})
          </button>
        ) : (
          <button onClick={like} className='flex items-center'>
            <AiFillLike className="fill-gray-500" />
            Liked ({props.photo.likes.length})
          </button>
        )}
        Comments ({Object.entries(props.photo.comments).length})
      </div>
      <div className={styles.verticalContainer}>
        <div className='flex flex-col w-11/12'>
          <textarea className={styles.textarea} onChange={handleChange} value={text}></textarea>
        </div>

        <div className={styles.buttonContainer}>
          <div className='mx-1'>
            <DropDownEmoji addEmoji={addEmoji} isLower={false} />
          </div>
          <div className='mx-1'>
            <button className={styles.button} onClick={sendComment}>
              <BsFillSendFill className='fill-white' />
            </button>
          </div>
        </div>
      </div>
      {Object.entries(props.photo.comments).map(([key, value]) => {
        return (<Comment key={key} comment={value} />);
      })}
    </>
  )
}