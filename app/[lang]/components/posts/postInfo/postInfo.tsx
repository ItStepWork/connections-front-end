"use client"

import { useState } from "react";
import { AiFillLike } from 'react-icons/ai';
import { BsFillSendFill } from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import { ImArrowDown, ImArrowUp } from 'react-icons/im';
import { PostService } from "../../../../../services/post.service";
import DropDownEmoji from "../../messaging/dropDownEmoji/page";
import Complaint from "../../support/complaint/page";
import Comment from "../comment/page";
import { FaUserCircle } from 'react-icons/fa';
import { LuArrowBigRight } from 'react-icons/lu';
import styles from './styles.module.scss';
import Link from "next/link";

export default function PostInfo(props: any) {

  const {
    myId,
    local,
    userId, 
    post,
    getPosts
  } = props;

  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenComments, setIsOpenComments] = useState<boolean>(false);
  const [isOpenComplaint, setIsOpenComplaint] = useState<boolean>(false);

  const like = async () => {
    if (post.recipientId != undefined) await PostService.setLike(post.recipientId, post.id);
    if (post.groupId != undefined) await PostService.setLike(post.groupId, post.id);
    getPosts();
  }

  const sendComment = async () => {
    if (post.recipientId != undefined) await PostService.sendComment(post.recipientId, post.id, text);
    if (post.groupId != undefined) await PostService.sendComment(post.groupId, post.id, text);
    getPosts();
    setText("");
  }

  const removePost = async () => {
    if (post.recipientId != undefined) await PostService.removePost(post.recipientId, post.id);
    if (post.groupId != undefined) await PostService.removePost(post.groupId, post.id);
    getPosts();
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
        {post.sender &&
          <div className="flex gap-6 flex-wrap">
            <div className={styles.user}>
              {post.sender.avatarUrl ? (<img className={styles.userImage} src={post.sender.avatarUrl} />) : (<FaUserCircle className={styles.userImage} />)}
              <Link className={styles.userName} href={"profile/" + post.sender.id}>{post.sender.lastName} {post.sender.firstName}</Link>
            </div>
            {((post.recipient && post.recipientId !== post.senderId) || post.group) && <LuArrowBigRight className="w-6 h-6 md:w-10 md:h-10" />}
            {post.recipient && post.recipientId !== post.senderId &&
              <div className={styles.user}>
                {post.recipientId.avatarUrl ? (<img className={styles.userImage} src={post.recipientId.avatarUrl} />) : (<FaUserCircle className={styles.userImage} />)}
                <Link className={styles.userName} href={"profile/" + post.recipient.id}>{post.recipient.lastName} {post.recipient.firstName}</Link>
              </div>
            }
            {post.group &&
              <div className={styles.user}>
                {post.group.pictureUrl ? (<img className={styles.userImage} src={post.group.pictureUrl} />) : (<FaUserCircle className={styles.userImage} />)}
                <Link className={styles.userName} href={"group/" + post.group.id}>{post.group.name}</Link>
              </div>
            }
          </div>
        }
        <div className={isOpen ? styles.dropdownButtonPress : styles.dropdownButton} onClick={() => { setIsOpen(!isOpen); }}>
          <HiDotsVertical size={20} />
        </div>
        {isOpen &&
          <div className={styles.dropdownContainer}>
            <div className={styles.item} onClick={() => { setIsOpen(false); setIsOpenComplaint(true); }}>{local.posts.report} </div>
            <div className={styles.item} onClick={() => { setIsOpen(false); removePost(); }}>{local.posts.delete} </div>
          </div>
        }
        <Complaint 
        isOpen={isOpenComplaint} 
        setIsOpen={setIsOpenComplaint} 
        userId={post.senderId} 
        postId={post.id} 
        local={local}
        />
      </div>
      <div className={styles.postTextContainer}>
        <div className="my-3">
          {post.text}
        </div>
        {post.imgUrl &&
          <img className="my-3" src={post.imgUrl} />
        }
      </div>
      <div>
        <div className={styles.postFooterContainer}>
          {post.likes.includes(myId) ? (
            <button onClick={like} className={styles.buttonLikeActive}>
              <AiFillLike className={styles.icon} />
              {local.posts.likes} ({post.likes.length})
            </button>
          ) : (
            <button onClick={like} className={styles.buttonLikeInactive}>
              <AiFillLike className={styles.icon} />
              {local.posts.likes}  ({post.likes.length})
            </button>
          )}
          <div className={styles.postArrowContainer} onClick={() => { setIsOpenComments(!isOpenComments) }} >
            {isOpenComments ? <ImArrowUp size={14} className="mx-1" /> : <ImArrowDown size={14} className="mx-1" />}
            {local.posts.comments}  ({Object.entries(post.comments).length})
          </div>

        </div>
        {isOpenComments &&
          <div>
            <div className={styles.verticalContainer}>
              <div className={styles.textareaContainer}>
                <textarea placeholder={local.posts.placeholder} className={styles.textarea} onChange={handleChange} value={text}></textarea>
              </div>

              <div className={styles.buttonContainer}>
                <div className='mx-1'>
                  <DropDownEmoji addEmoji={addEmoji} isLower={false} />
                </div>
                <div className='mx-1'>
                  <button className={styles.button} title={local.posts.tooltip.send} onClick={sendComment}>
                    <BsFillSendFill className='fill-white' />
                  </button>
                </div>
              </div>
            </div>
            {Object.entries(post.comments).map(([key, value]) => {
              return (<Comment key={key} comment={value} />);
            })}
          </div>}

      </div>
    </div>
  )
}