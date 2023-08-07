'use client'
import { useSession } from 'next-auth/react';
import HeaderBlock from '@/components/messaging/headerBlock/page';
import styles from './styles.module.scss'
import React from 'react';
import MainBlock from '@/components/messaging/mainBlock/page';
import FooterBlock from '@/components/messaging/footerBlock/page';
import { IUser } from '@/dto/sessionDto';
import { Dialogues } from '@/components/messaging/dialogues/page';
import { NewMessage } from '@/components/messaging/newMessage/page';


type MyProps = {
  token: string,
  id: string,
};
type MyState = {
  messages: [],
  dialogs: [],
  users: IUser[],
  user: IUser | null,
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


  async removeDialog(id: string){
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "User/RemoveDialog?id=" + id, {
      method:"DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.props.token
      },
    });

    if (response.ok) {
      this.loadDialogs();
      this.setState({ messages: [], user: null });
    }
  }

  render() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.centerContainer}>
            <div className={styles.leftContainer}>
              <NewMessage length={this.state.dialogs.length} users={this.state.users} loadDialogs={this.loadDialogs} token={this.props.token}/>
              <Dialogues dialogs={this.state.dialogs} click={this.click} user={this.state.user}/>
            </div>
            <hr className={styles.verticalHr} />
            <div className={styles.rightContainer}>
              {this.state.user ? (
                <>
                  <HeaderBlock user={this.state.user} removeDialog={this.removeDialog}/>
                  <MainBlock messages={this.state.messages} myId={this.props.id} user={this.state.user} />
                  <FooterBlock friendId={this.state.user.id} token={this.props.token} loadMessages={this.loadMessages} loadDialogs={this.loadDialogs} />
                </>
              ) : (<></>)}

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