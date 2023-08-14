'use client'
import HeaderBlock from '@/components/messaging/headerBlock/page';
import styles from './styles.module.scss'
import React from 'react';
import MainBlock from '@/components/messaging/mainBlock/page';
import FooterBlock from '@/components/messaging/footerBlock/page';
import { IUser } from '@/dto/sessionDto';
import { Dialogues } from '@/components/messaging/dialogues/page';
import { NewMessage } from '@/components/messaging/newMessage/page';
import { DropDownDialogues } from '@/components/messaging/dropDownDialogues/page';
import { UserService } from '@/services/user.service';
import { MessagingService } from '@/services/messaging.service';

type MyState = {
  messages: [],
  dialogs: [],
  users: IUser[],
  user: IUser | null,
};

export default class Messaging extends React.Component<MyState>{

  state: MyState = {
    messages: [],
    dialogs: [],
    users: [],
    user: null,
  };

  constructor(props: any) {
    super(props);
    this.loadMessages = this.loadMessages.bind(this);
    this.click = this.click.bind(this);
    this.loadDialogs = this.loadDialogs.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    this.removeDialog = this.removeDialog.bind(this);
  }

  componentDidMount(): void {
    this.loadDialogs();
    this.loadUsers();
  }

  async loadMessages(id: string) {
    const result = await MessagingService.getMessages(id);
    this.setState({ messages: result });
  }

  click(user: IUser) {
    if (user !== this.state.user) {

      this.setState({ user: user });
      this.loadMessages(user.id);
    }
  }

  async removeDialog(id: string) {
    await MessagingService.removeDialog(id);
    this.loadDialogs();
    this.setState({ messages: [], user: null });
  }

  render() {
    return (
      <>
        <div className={styles.container}>

          <div className='absolute flex mt-16 lg:invisible'>
            <DropDownDialogues dialogs={this.state.dialogs} click={this.click} user={this.state.user}/><h2 className='my-1 mx-2'>Чаты</h2>
          </div>
          <div className={styles.centerContainer}>


            <div className={styles.leftContainer}>
              <NewMessage length={this.state.dialogs.length} users={this.state.users} loadDialogs={this.loadDialogs} />
              <div className='invisible h-0 lg:visible lg:h-auto overflow-y-auto'>
                <Dialogues dialogs={this.state.dialogs} click={this.click} user={this.state.user} />
              </div>
            </div>
            <hr className={styles.verticalHr} />
            <div className={styles.rightContainer}>
              {this.state.user ? (
                <>
                  <HeaderBlock user={this.state.user} removeDialog={this.removeDialog} />
                  <MainBlock messages={this.state.messages} user={this.state.user} />
                  <FooterBlock friendId={this.state.user.id} loadMessages={this.loadMessages} loadDialogs={this.loadDialogs} />
                </>
              ) : (<></>)}

            </div>
          </div>
        </div>

      </>
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
}