"use client"
import { useState } from "react";
import { AiFillLike } from 'react-icons/ai';
import { BsFillSendFill } from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import { GalleryService } from '../../../../../services/gallery.service';
import DropDownEmoji from '../../messaging/dropDownEmoji/page';
import Complaint from "../../support/complaint/page";
import Avatar from '../avatar/page';
import Comment from '../comment/page';
import styles from './styles.module.scss';

export default function InfoPhoto(props: any) {
  
  const {
    myId,
    userId,
    photo,
    local
  } = props;

  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenComplaint, setIsOpenComplaint] = useState<boolean>(false);

  const like = async () => {
    await GalleryService.setLikePhoto(userId, photo.id);
  }

  const sendComment = async () => {
    await GalleryService.sendCommentPhoto(userId, photo.id, text);
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
      <div className={styles.container}>
        <Avatar userId={userId} />
        <div className="cursor-pointer" onClick={() => { setIsOpen(!isOpen); }}>
          <HiDotsVertical size={20} {...isOpen ? { className: "mt-3 fill-light_button_BG_hover" } : { className: "mt-3 fill-button_blue_BG" }} />
        </div>
        {isOpen &&
          <div className={styles.reportContainer}>
            <div className={styles.report} onClick={ ()=>{setIsOpen(false); setIsOpenComplaint(true); }}>{local.posts.report}</div>
          </div>
        }
        <Complaint 
          isOpen={isOpenComplaint} 
          setIsOpen={setIsOpenComplaint} 
          userId={userId} 
          photoId={photo.id} 
          photoUrl={photo.url} 
          local={local}
        />
      </div>
      <div className={styles.likesContainer}>
        {photo.likes.includes(myId) ? (
          <button onClick={like} className={styles.buttonActive}>
            <AiFillLike className={styles.icon} />
            {local.posts.likes} ({photo.likes.length})
          </button>
        ) : (
          <button onClick={like} className={styles.buttonInActive}>
            <AiFillLike className={styles.icon} />
            {local.posts.likes} ({photo.likes.length})
          </button>
        )}
        {local.posts.comments} ({Object.entries(photo.comments).length})
      </div>
      <div className={styles.verticalContainer}>
        <div className={styles.textareaContainer}>
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
      {Object.entries(photo.comments).map(([key, value]) => {
        return (<Comment key={key} comment={value} />);
      })}
    </>
  )
}