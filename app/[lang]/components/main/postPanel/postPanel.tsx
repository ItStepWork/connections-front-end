"use client"
import { faker } from '@faker-js/faker';
import { useEffect, useState } from "react";
import { BsCalendar2EventFill, BsCameraReelsFill, BsFillEmojiSmileFill } from 'react-icons/bs';
import { HiPhoto } from 'react-icons/hi2';
import { UserService } from '../../../../../services/user.service';
import { CreatePost } from '../createPost/createPost';
import { PostPhoto } from '../postPhoto/postPhoto';
import { PostVideo } from '../postVideo/postVideo';
import styles from "./styles.module.scss";
import { CreateEvent } from '../createEvent/createEvent';

export const PostPanel = (props: any) => {

  // const closeDialog = () => { document.querySelector("dialog")?.close(); }
  const openDialog = () => {
    //  document.querySelector("dialog")?.showModal(); 
    var dialog: any = document.getElementById("postDialog")
    dialog?.showModal()
  }
  // const { data: session, update } = useSession<any>();
  const [component, setComponent] = useState("");
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    GetUser();
  }, []);
  const GetUser = async () => {
    let result = await UserService.getCurrentUser();
    setUser(result);
  }
  const getComponent = (value: string) => {
    setComponent(value)
    openDialog();
  }
  const showComponent = () => {
    if (component == "createPost") return <CreatePost user={user} local={props.local}></CreatePost>
    else if (component == "postPhoto") return <PostPhoto user={user} local={props.local}></PostPhoto>
    else if (component == "postVideo") return <PostVideo user={user} local={props.local}></PostVideo>
    else if (component == "createEvent") return <CreateEvent user={user} local={props.local}></CreateEvent>
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.topDiv}>
          {user?.avatarUrl
            ? <img className={styles.userIco} src={user.avatarUrl}></img>
            : <img className={styles.userIco} src={faker.image.avatar()}></img>
          }
          <input type="text" className={styles.grInput} onClick={() => { getComponent("createPost") }} placeholder={props.local.posts.placeholder}></input>
        </div>
        <div className={styles.bottomDiv}>
          <div className={styles.btnDiv} onClick={() => { getComponent("postPhoto") }}>
            <HiPhoto size={16} className="fill-green-500"></HiPhoto>
            <a>{props.local.posts.photo}</a>
          </div>
          <div className={styles.btnDiv} onClick={() => { getComponent("postVideo") }}>
            <BsCameraReelsFill size={16} className="fill-blue-500"></BsCameraReelsFill>
            <a>{props.local.posts.video}</a>
          </div>
          <div className={styles.btnDiv} onClick={() => { getComponent("createEvent") }}>
            <BsCalendar2EventFill size={16} className="fill-red-500"></BsCalendar2EventFill>
            <a>{props.local.posts.event}</a>
          </div>
          <div className={styles.btnDiv} onClick={() => { getComponent("createPost") }}>
            <BsFillEmojiSmileFill size={16} className="fill-yellow-500" ></BsFillEmojiSmileFill>
            <a>{props.local.posts.activity}</a>
          </div>
        </div>
      </div>
      <div className={styles.bottomDiv}></div>
      <dialog className={styles.dialog} id='postDialog'>{showComponent()}</dialog>
    </>
  )
}