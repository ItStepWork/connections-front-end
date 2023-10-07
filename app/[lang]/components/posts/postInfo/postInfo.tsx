"use client"

import { useState } from "react";
import { AiFillLike } from 'react-icons/ai';
import { BsFillSendFill } from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import { ImArrowDown, ImArrowUp } from 'react-icons/im';
import { PostService } from "../../../../../services/post.service";
import Avatar from "../../gallery/avatar/page";
import DropDownEmoji from "../../messaging/dropDownEmoji/page";
import Complaint from "../../support/complaint/page";
import Comment from "../comment/page";
import styles from './styles.module.scss';

export default function PostInfo(props: any) {

  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenComments, setIsOpenComments] = useState<boolean>(false);
  const [isOpenComplaint, setIsOpenComplaint] = useState<boolean>(false);

  const like = async () => {
    await PostService.setLike(props.post.recipientId, props.post.id);
    props.getPosts();
  }

  const sendComment = async () => {
    await PostService.sendComment(props.post.recipientId, props.post.id, text);
    props.getPosts();
    setText("");
  }

  const removePost = async () => {
    await PostService.removePost(props.post.recipientId, props.post.id);
    props.getPosts();
  }

  function handleChange(event: any) {
    setText(event.target.value);
  }

  function addEmoji(emoji: any) {
    setText(text + emoji);
  }

  return (
    <div className={styles.container}>
      <div className={styles.postHeaderContainer}>
        <Avatar userId={props.post.senderId} />
        <div className={isOpen ? styles.dropdownButtonPress : styles.dropdownButton} onClick={() => { setIsOpen(!isOpen); }}>
          <HiDotsVertical size={20}  />
        </div>
        {isOpen &&
          <div className={styles.dropdownContainer}>
            <div className={styles.item} onClick={() => { setIsOpen(false); setIsOpenComplaint(true); }}>{props.local.posts.report} </div>
            <div className={styles.item} onClick={() => { setIsOpen(false); setIsOpenComments(true); }}>{props.local.posts.likes} </div>
            <div className={styles.item} onClick={() => { setIsOpen(false); removePost(); }}>{props.local.posts.delete} </div>
          </div>
        }
        <Complaint isOpen={isOpenComplaint} setIsOpen={setIsOpenComplaint} userId={props.post.senderId} postId={props.post.id} />
      </div>
      <div className={styles.postTextContainer}>
        <div className="my-3">
          {props.post.text}
        </div>
        {props.post.imgUrl &&
          <img className="my-3" src={props.post.imgUrl} />
        }
      </div>
      <div>
        <div className={styles.postFooterContainer}>
          {props.post.likes.includes(props.myId) ? (
            <button onClick={like} className={styles.buttonLikeActive}>
              <AiFillLike className={styles.icon} />
              {props.local.posts.likes} ({props.post.likes.length})
            </button>
          ) : (
            <button onClick={like} className={styles.buttonLikeInactive}>
              <AiFillLike className={styles.icon} />
              {props.local.posts.likes}  ({props.post.likes.length})
            </button>
          )}
          <div className={styles.postArrowContainer} onClick={() => { setIsOpenComments(!isOpenComments) }} >
            {isOpenComments ? <ImArrowUp size={14} className="mx-1" />:<ImArrowDown size={14} className="mx-1" />}
            {props.local.posts.comments}  ({Object.entries(props.post.comments).length})
          </div>

        </div>
        {isOpenComments &&
          <div>
            <div className={styles.verticalContainer}>
              <div className={styles.textareaContainer}>
                <textarea placeholder={props.local.posts.placeholder} className={styles.textarea} onChange={handleChange} value={text}></textarea>
              </div>

              <div className={styles.buttonContainer}>
                <div className='mx-1'>
                  <DropDownEmoji addEmoji={addEmoji} isLower={false} />
                </div>
                <div className='mx-1'>
                  <button className={styles.button} title={props.local.posts.tooltip.send} onClick={sendComment}>
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