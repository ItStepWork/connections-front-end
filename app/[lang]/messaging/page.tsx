'use client'

import { getSession } from 'next-auth/react';
import React from 'react';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { IUser } from '../../../dto/sessionDto';
import { MessagingService } from '../../../services/messaging.service';
import { UserService } from '../../../services/user.service';
import Dialogues from '../components/messaging/dialogues/page';
import DropDownDialogues from '../components/messaging/dropDownDialogues/page';
import FooterBlock from '../components/messaging/footerBlock/page';
import HeaderBlock from '../components/messaging/headerBlock/page';
import MainBlock from '../components/messaging/mainBlock/page';
import NewMessage from '../components/messaging/newMessage/page';
import Window from '../components/messaging/window/page';
import styles from './styles.module.scss';

type MyState = {
  messages: [],
  dialogs: [],
  users: IUser[],
  user: IUser | null,
  isOpen: boolean,
  isOpenDialogs: boolean,
  socket: WebSocket | null,
  intervalId: string | number | NodeJS.Timeout | undefined,
};

export default class Messaging extends React.Component<MyState>{

  state: MyState = {
    messages: [],
    dialogs: [],
    users: [],
    user: null,
    isOpen: false,
    isOpenDialogs: false,
    socket: null,
    intervalId: undefined,
  };

  constructor(props: any) {
    super(props);
    this.loadMessages = this.loadMessages.bind(this);
    this.click = this.click.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.loadDialogs = this.loadDialogs.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    this.removeDialog = this.removeDialog.bind(this);
    this.setIsOpen = this.setIsOpen.bind(this);
    this.setIsOpenDialogs = this.setIsOpenDialogs.bind(this);
  }

  async componentDidMount() {
    await this.subscribe();
    await this.loadDialogs();
    await this.loadUsers();
  }

  componentWillUnmount(): void {
    this.state.socket?.close();
    clearInterval(this.state.intervalId);
  }

  componentWillUpdate(nextProps: Readonly<{}>, nextState: Readonly<MyState>, nextContext: any): void {
    if(this.state.socket !== nextState.socket) {
      let socket = this.state.socket;
      setTimeout(()=>{socket?.close();}, 1000)
    }
    if(this.state.intervalId !== nextState.intervalId) clearInterval(this.state.intervalId);
  }

  async loadMessages(id: string) {
    const result = await MessagingService.getMessages(id);
    this.setState({ messages: result });
  }

  click(user: IUser) {
    if (user !== this.state.user) {
      this.setState({ user: user });
      this.loadMessages(user.id);
      if (this.state.isOpenDialogs) this.setState({ isOpenDialogs: false });
    }
  }

  async removeDialog(id: string) {
    await MessagingService.removeDialog(id);
    this.loadDialogs();
    this.setState({ messages: [], user: null });
  }

  setIsOpen(isOpen: boolean) {
    this.setState({ isOpen: isOpen });
  }

  setIsOpenDialogs(isOpenDialogs: boolean) {
    this.setState({ isOpenDialogs: isOpenDialogs });
  }

  render() {
    return (
      <div className={styles.container}>

        <div className='absolute flex mt-16 lg:invisible'>
          <DropDownDialogues dialogs={this.state.dialogs} click={this.click} user={this.state.user} isOpen={this.state.isOpenDialogs} setIsOpen={this.setIsOpenDialogs} /><h2 className='my-1 mx-2'>Чаты</h2>
        </div>
        <div className={styles.centerContainer}>
          <div className={styles.leftContainer}>
            <div className='m-3 flex justify-between items-center'>
              <h2>Активные чаты <span className={styles.chats}>{this.state.dialogs.length}</span></h2>
              <button {...this.state.isOpen ? { className: styles.buttonOpen } : { className: styles.buttonClose }} onClick={() => this.setIsOpen(true)}>
                <HiMiniPencilSquare />
              </button>
              <Window name="Новое сообщение" isOpen={this.state.isOpen} setIsOpen={this.setIsOpen}>
                <NewMessage users={this.state.users} />
              </Window>
            </div>
            <hr className={styles.horizontalHr} />
            <div className='invisible h-0 lg:visible lg:h-auto overflow-y-auto'>
              <Dialogues dialogs={this.state.dialogs} click={this.click} user={this.state.user} />
            </div>
          </div>
          <hr className={styles.verticalHr} />
          {this.state.user ? (
            <div className={styles.rightContainer}>
              <HeaderBlock user={this.state.user} removeDialog={this.removeDialog} />
              <MainBlock messages={this.state.messages} user={this.state.user}/>
              <hr className={styles.horizontalHr} />
              <FooterBlock friendId={this.state.user.id}/>
            </div>
          ) : (<div className={styles.rightContainer}></div>)}
        </div>
      </div>
    );
  }

  async loadDialogs() {
    let result = await MessagingService.getDialogs();
    this.setState({ dialogs: result });
  }

  async loadUsers() {
    let result = await UserService.getUsers();
    this.setState({ users: result });
  }

  async subscribe() {
    let session = await getSession();
    if (session != null) {
      let socket = new WebSocket(process.env.NEXT_PUBLIC_SUBSCRIPTION_API + `Subscription/SubscribeToMessagesUpdates`, ["client", session.user.accessToken]);
      socket.addEventListener('message', (event) => {
        this.loadDialogs();
        if (this.state.user !== null) {
          this.loadMessages(this.state.user.id);
        }
      });
      let intervalId = setInterval(() => {
        if(socket.OPEN)socket.send("ping");
        else clearInterval(intervalId);
      }, 30000);
      this.setState({socket: socket, intervalId: intervalId});
    }
  }
}