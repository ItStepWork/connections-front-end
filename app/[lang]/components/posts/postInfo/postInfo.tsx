"use client"

import { useState } from "react";
import { AiFillLike } from 'react-icons/ai';
import { BsFillSendFill } from 'react-icons/bs';
import styles from './styles.module.scss';
import DropDownEmoji from "../../messaging/dropDownEmoji/page";
import Complaint from "../../support/complaint/page";
import Avatar from "../../gallery/avatar/page";
import { HiDotsVertical } from 'react-icons/hi';
import { ImArrowDown, ImArrowUp } from 'react-icons/im';
import { PostService } from "../../../../../services/post.service";
import Comment from "../comment/page";

export default function PostInfo(props: any) {

  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenComments, setIsOpenComments] = useState<boolean>(false);
  const [isOpenComplaint, setIsOpenComplaint] = useState<boolean>(false);

  const like = async () => {
    await PostService.setLike(props.userId, props.post.id);
  }

  const sendComment = async () => {
    await PostService.sendComment(props.userId, props.post.id, text);
    setText("");
  }

  const removePost = async () => {
    await PostService.removePost(props.post.id);
  }

  function handleChange(event: any) {
    setText(event.target.value);
  }

  function addEmoji(emoji: any) {
    setText(text + emoji);
  }

  return (
    <div className="border border-light_border rounded-lg dark:border-dark_border p-3 my-3">
      <div className="relative my-3 w-full flex flex-row flex-nowrap justify-between">
        <Avatar userId={props.post.senderId} />
        <div className="cursor-pointer" onClick={() => { setIsOpen(!isOpen); }}>
          <HiDotsVertical size={20} {...isOpen ? { className: "mt-2 fill-light_button_BG_hover" } : { className: "mt-2 fill-button_blue_BG" }} />
        </div>
        {isOpen &&
          <div className="absolute z-50 p-3 flex flex-col top-[40px] right-0 bg-white text-gray-900 border border-light_border rounded-lg
            dark:text-dark_text_gray dark:bg-dark_background dark:border-dark_border">
            <div className='cursor-pointer text-dark_text_gray hover:text-button_blue_BG' onClick={() => { setIsOpen(false); setIsOpenComplaint(true); }}>Complain</div>
            <div className='cursor-pointer text-dark_text_gray hover:text-button_blue_BG' onClick={() => { setIsOpen(false); setIsOpenComments(true); }}>Comments</div>
            <div className='cursor-pointer text-dark_text_gray hover:text-button_blue_BG' onClick={() => { setIsOpen(false); removePost(); }}>Remove</div>
          </div>
        }
        <Complaint isOpen={isOpenComplaint} setIsOpen={setIsOpenComplaint} userId={props.post.senderId} />
      </div>
      <div className='flex flex-col my-1'>
        <div className="my-3">
          {props.post.text}
        </div>
        {props.post.imgUrl &&
          <img className="my-3" src={props.post.imgUrl} />
        }
      </div>
      <div>
        <div className='flex justify-between'>
          {props.post.likes.includes(props.myId) ? (
            <button onClick={like} className='flex items-center text-button_blue_BG'>
              <AiFillLike className="fill-button_blue_BG" />
              Liked ({props.post.likes.length})
            </button>
          ) : (
            <button onClick={like} className='flex items-center'>
              <AiFillLike className="fill-gray-500" />
              Liked ({props.post.likes.length})
            </button>
          )}
          <div className="cursor-pointer flex flex-row flex-nowrap items-center hover:text-button_blue_BG" onClick={() => { setIsOpenComments(!isOpenComments) }} >
            {isOpenComments ? <ImArrowUp size={14} className="mx-1" />:<ImArrowDown size={14} className="mx-1" />}
            Comments ({Object.entries(props.post.comments).length})
          </div>

        </div>
        {isOpenComments &&
          <div>
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
            {Object.entries(props.post.comments).map(([key, value]) => {
              return (<Comment key={key} comment={value} />);
            })}
          </div>}

      </div>
    </div>
  )
}