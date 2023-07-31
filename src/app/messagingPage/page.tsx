'use client'
import { useSession } from 'next-auth/react';
import HeaderBlock from '@/components/messaging/headerBlock/page';
import styles from './styles.module.scss'
import React from 'react';
import MainBlock from '@/components/messaging/mainBlock/page';
import FooterBlock from '@/components/messaging/footerBlock/page';

type MyProps = {
  token: string;
  id: string
};
type MyState = {
  messages: [],
  dialogs: [];
  value: string;
};

class Messaging extends React.Component<MyProps, MyState>{

  props: MyProps = {
    token: "",
    id: ""
  }

  state: MyState = {
    messages: [],
    dialogs: [],
    value: ""
  };

  // constructor(props: MyProps) {
  //   // super(props);
  //   this.click = this.click.bind(this)
  // }

  componentDidMount(): void {
    this.loadDialogs();
  }

  async loadMessages(value: string){
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "User/GetMessages?id=" + value, {
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

  click(value: string) {
    if(value !== this.state.value){
      
      this.setState({ value: value });
      this.loadMessages(value);
    }
  }

  render() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.centerContainer}>
            <div className={styles.leftContainer}>
              <ul className={styles.users}>
                {this.state.dialogs.map((dialog: any, index: any) =>
                  <li key={index} onClick={() => this.click(dialog.user.id)} {...this.state.value === dialog.user.id ? { className: "bg-slate-200 rounded-lg dark:bg-zinc-700" } : { className: "" }}>
                    <div className={styles.user}>
                      <img className={styles.userImage} src="../favicon.ico" alt="Rounded avatar" />
                      <div className={styles.userInfo}>
                        <span>{dialog.user.email}</span>
                        <span className={styles.userMessage}>{dialog.lastMessage.text}</span>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            <hr className={styles.hr} />
            <div className={styles.rightContainer}>
              <HeaderBlock />
              <MainBlock messages={this.state.messages} myId={this.props.id} friendId={this.state.value} />
              <FooterBlock friendId={this.state.value} token={this.props.token}/>
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