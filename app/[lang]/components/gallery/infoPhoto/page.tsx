"use client"
import { useState } from "react";
import { AiFillLike } from 'react-icons/ai';
import { BsFillSendFill } from 'react-icons/bs';
import { GalleryService } from '../../../../../services/gallery.service';
import { DropDownEmoji } from '../../messaging/dropDownEmoji/page';
import { Avatar } from '../avatar/page';
import { Comment } from '../comment/page';
import styles from './styles.module.scss';

export function InfoPhoto(props: any) {

  const [text, setText] = useState("");

  const like = async () => {
    await GalleryService.setLikePhoto(props.userId, props.photo.id);
    props.get();
  }

  const sendComment = async () => {
    await GalleryService.sendCommentPhoto(props.userId, props.photo.id, text);
    setText("");
    props.get();
  }

  function handleChange(event: any) {
    setText(event.target.value);
  }

  function addEmoji(emoji: any) {
    setText(text + emoji);
  }

  return (
    <>
      <Avatar userId={props.userId} accessToken={props.accessToken}/>
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
      {Object.entries(props.photo.comments).map(([key, value])=>{
        return(<Comment key={key} comment={value}/>);
      })}
    </>
  )
}