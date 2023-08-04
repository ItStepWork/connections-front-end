'use client'
import { useSession } from 'next-auth/react';
import HeaderBlock from '@/components/messaging/headerBlock/page';
import styles from './styles.module.scss'
import React from 'react';
import MainBlock from '@/components/messaging/mainBlock/page';
import FooterBlock from '@/components/messaging/footerBlock/page';
import { IUser } from '@/dto/sessionDto';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { FaCircleUser } from 'react-icons/fa6';
import { BsFillSendFill } from 'react-icons/bs';
import UserDialog from '@/components/messaging/userDialog/page';


type MyProps = {
  token: string,
  id: string,
};
type MyState = {
  messages: [],
  dialogs: [],
  users: IUser[],
  filterUsers: IUser[],
  user: IUser | null,
  isOpen: boolean,
  isOpenNewMessage: boolean,
  message: string,
  findUser: IUser | null,
  search: string,
};

class Messaging extends React.Component<MyProps, MyState>{

  props: MyProps = {
    token: "",
    id: "",
  }

  state: MyState = {
    messages: [],
    dialogs: [],
    users: [],
    filterUsers: [],
    user: null,
    isOpen: false,
    isOpenNewMessage: false,
    message: "",
    findUser: null,
    search: "",
  };

  constructor(props: any) {
    super(props);
    this.loadMessages = this.loadMessages.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.click = this.click.bind(this);
    this.select = this.select.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.loadDialogs = this.loadDialogs.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
  }

  

  componentDidMount(): void {

    this.loadDialogs();
    this.loadUsers();
  }

  async loadMessages(id: string) {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetMessages?id=" + id, {
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + this.props.token
      },
    });

    if (response.ok) {
      let result = await response.json();
      this.setState({ messages: result });
    }
  }

  click(user: IUser) {
    if (user !== this.state.user) {

      this.setState({ user: user });
      this.loadMessages(user.id);
    }
  }

  select(findUser: IUser) {
    if (findUser !== this.state.findUser) {
      this.setState({ findUser: findUser });
    }
  }

  changeMessage(event: any){
    this.setState({message: event.target.value});
  }
  
  changeSearch(event: any){
    this.setState({search: event.target.value});
    if(event.target.value === ""){
      this.setState({filterUsers: this.state.users});
    }
    else{
      let search = event.target.value.toLowerCase();
      let users = this.state.users.filter(u=>u.firstName?.toLowerCase().includes(search) || u.lastName?.toLowerCase().includes(search) || u.email?.toLowerCase().includes(search) || u.phone?.toLowerCase().includes(search) || (u.firstName?.toLowerCase() + " " + u.lastName?.toLowerCase()).includes(search) || (u.lastName?.toLowerCase() + " " + u.firstName?.toLowerCase()).includes(search));
      this.setState({filterUsers: users});
    }
  }

  async sendMessage(){
    if(this.state.findUser !== null){
      const formData = new FormData();
      formData.append("id", this.state.findUser.id);
      formData.append("text", this.state.message);

      const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "User/SendMessage", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + this.props.token
        },
        body: formData,
      });
  
      this.setState({message: ""});
      if (response.ok) {
        this.loadDialogs();
      }
    }
  }

  render() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.centerContainer}>
            <div className={styles.leftContainer}>
              <div>
                <div className='m-5 flex justify-between items-center'>
                  <h2>Активные чаты <span className={styles.chats}>{this.state.dialogs.length}</span></h2>
                  <button onClick={() => this.setState({ isOpen: !this.state.isOpen, isOpenNewMessage: true })} onFocus={() => { if (this.state.isOpen) this.setState({ isOpen: true }) }} onBlur={() => this.setState({ isOpen: false })} >

                    <HiMiniPencilSquare size={40} {...this.state.isOpen ? { className: "bg-buttonBlue p-3 rounded-full fill-white" } : { className: "bg-buttonBlueOpacity p-3 rounded-full fill-buttonBlue" }} />
                  </button>
                </div>
                <hr className={styles.horizontalHr} />
              </div>
              <ul className={styles.users}>
                {this.state.dialogs.map((dialog: any, index: any) =>
                  <li key={index} onClick={() => this.click(dialog.user)} {...this.state.user?.id === dialog.user.id ? { className: "bg-slate-200 rounded-lg dark:bg-zinc-700" } : { className: "" }}>
                    <UserDialog dialog={dialog}/>
                  </li>
                )}
              </ul>
            </div>
            <hr className={styles.verticalHr} />
            <div className={styles.rightContainer}>
              {this.state.user ? (
                <>
                  <HeaderBlock user={this.state.user} />
                  <MainBlock messages={this.state.messages} myId={this.props.id} friendId={this.state.user.id} />
                  <FooterBlock friendId={this.state.user.id} token={this.props.token} loadMessages={this.loadMessages} loadDialogs={this.loadDialogs} />
                </>
              ) : (<></>)}

            </div>
          </div>
        </div>

        <div {...this.state.isOpenNewMessage ? { className: styles.newMessage + " visible z-50" } : { className: styles.newMessage + " invisible z-50" }}>
          <div className={styles.newMessageContainer}>
            <div className={styles.newMessageHeader}>
              <h2>Новое сообщение</h2>
              <button onClick={() => this.setState({ isOpenNewMessage: false })}>
                <IoMdClose size={26} className={styles.buttonClose} />
              </button>
            </div>
            <hr className={styles.horizontalHr} />
            <div className={styles.newMessageContent}>
              <div className="flex">
                <span className={styles.iconSearch}>
                  <FaCircleUser size={20} />
                </span>
                <input type="text" className={styles.inputSearch} placeholder="Введите имя" onChange={this.changeSearch} value={this.state.search} />
              </div>
              <ul className={styles.users + " h-2/4 overflow-auto"}>
                {this.state.filterUsers.map((user: any, index: any) =>
                  <li key={index} onClick={() => this.select(user)} {...this.state.findUser === user ? { className: "mx-2 bg-slate-200 rounded-lg dark:bg-zinc-700" } : { className: "mx-2" }}>
                    <div className={styles.user}>
                      <img className={styles.userImage} src="../favicon.ico" alt="Rounded avatar" />
                      <div className={styles.userInfo}>
                        <span className={styles.userName}>{user.firstName} {user.lastName}</span>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
              <div className='flex justify-between'>
                <textarea className={styles.textarea} onChange={this.changeMessage} value={this.state.message}></textarea>
                <div className={styles.buttonContainer}>
                  <button className={styles.button} onClick={this.sendMessage}>
                    <BsFillSendFill className='fill-white'/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  async loadDialogs() {

    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetDialogs", {
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + this.props.token
      },
    });

    if (response.ok) {
      let result = await response.json();
      this.setState({ dialogs: result });
    }
  }

  async loadUsers() {

    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetUsers", {
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + this.props.token
      },
    });

    if (response.ok) {
      let result = await response.json();
      this.setState({ users: result });
      this.setState({ filterUsers: result });
    }
  }
}

export default () => {
  const { data: session } = useSession();
  let token: string = session?.user?.accessToken as string;
  let id: string = session?.user?.id as string;
  if (session === undefined) {
    return (<></>);
  }
  else
    return (
      <Messaging token={token} id={id} />
    )
}