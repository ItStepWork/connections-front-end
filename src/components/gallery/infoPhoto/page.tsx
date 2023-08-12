import { DropDownEmoji } from '@/components/messaging/dropDownEmoji/page';
import styles from './styles.module.scss'
import { useState } from "react";
import { AiFillLike } from 'react-icons/ai'
import { BsFillSendFill } from 'react-icons/bs';
import { Comment } from '../comment/page';
import { Avatar } from '../avatar/page';

export function InfoPhoto(props: any) {

  const [text, setText] = useState("");

  const like = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + `Gallery/SetLikePhoto?userId=${props.userId}&photoId=${props.photo.id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + props.accessToken
      },
    });

    if (response.ok) {
      props.get();
    }
  }

  const sendComment = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + `Gallery/SendCommentPhoto?userId=${props.userId}&photoId=${props.photo.id}&text=${text}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + props.accessToken
      },
    });
    setText("");
    if (response.ok) {
      props.get();
    }
  }

  function handleChange(event: any) {
    setText(event.target.value);
  }

  function addEmoji(emoji: any) {
    setText(text + emoji);
  }

  return (
    <div className={styles.container}>
      <Avatar myId={props.myId} accessToken={props.accessToken}/>
      <div className='flex justify-between m-3'>
        {props.photo.likes.includes(props.myId) ? (
          <button onClick={like} className='flex items-center text-buttonBlue'>
            <AiFillLike className="fill-buttonBlue" />
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
            <DropDownEmoji addEmoji={addEmoji} isLower={true} />
          </div>
          <div className='mx-1'>
            <button className={styles.button} onClick={sendComment}>
              <BsFillSendFill className='fill-white' />
            </button>
          </div>
        </div>
      </div>
      {Object.entries(props.photo.comments).map(([key, value])=>{
        return(<Comment comment={value} accessToken={props.accessToken}/>);
      })}
    </div>
  )
}