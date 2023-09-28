import Link from "next/link";
import styles from "./styles.module.scss";

const Help = () => {
  return (
    <>
      <div className={styles.container}>
      <h1>Welcome to <mark className={styles.mark}>Help</mark> center</h1>
        <p className={styles.firstLine}>Registration account</p>
        <ul className={styles.list}>
          <li>visit to <Link className={styles.link} href={'/signIn'} >sign-in link</Link>, or <Link className={styles.link} href={'/signUp'} >sign-up link</Link> for redirect to registration form.</li>
          <li>fill out all form fields</li>
          <li>enter user name</li>
          <li>enter last bane</li>
          <li>enter email address</li>
          <li>enter password</li>
          <li>enter confirm password, passwords must match </li>
          <li>click to Registration button</li>
          <li>you will receive a letter by email, after success registration</li>
          <li>enter to you account with registration data</li>
        </ul>
        <p className={styles.firstLine}>Changing user data in profile</p>
        <ul className={styles.list}>
          <li>for changing user data visit to settings page on navigation menu, profile page or main page</li>
          <li>settings divided into 3 blocks
            <ol className={styles.listNumeric}>
              <li>account settings</li>
              <li>changing password</li>
              <li>changing photo</li>
            </ol></li>
          <li>account setting has fields like this
            <ol className={styles.listNumeric}>
              <li>name</li>
              <li>last name</li>
              <li>born</li>
              <li>phone</li>
              <li>email</li>
              <li>gender</li>
              <li>family status</li>
              <li>work</li>
              <li>location</li>
              <li>description message</li>
            </ol>
          </li>
          <li>changing password has fields like this
            <ol className={styles.listNumeric}>
              <li>current password</li>
              <li>new password</li>
              <li>confirm password</li>
            </ol>
          </li>
          <li>changing photo has fields like this
            <ol className={styles.listNumeric}>
              <li>dropzone or button for upload photo</li>
              <li>dropdown list for changing type photo in profile</li>
              <li>upload button</li>
            </ol>
          </li>
          <li>enter data to need field</li>
          <li>safe changes clicked on button</li>
        </ul>
        <p className={styles.firstLine}>Creating group, private or public protection</p>
        <ul className={styles.list}>
          <li>visit to <Link className={styles.link} href={'/main'} >main</Link> page</li>
          <li>in side bar click to button groups</li>
          <li>To create a group you need to take several steps
            <ol className={styles.listNumeric}>
              <li>click to "plus" button in top-right angle in window</li>
              <li>in modal window enter group name</li>
              <li>upload group image</li>
              <li>change type group in dropdown menu "public or private"</li>
              <li>enter description fo your group</li>
              <li>click to "create" button</li>
            </ol>
          </li>
          </ul>
        <p className={styles.firstLine}>group managing and changing group settings</p>
        <ul className={styles.list}>
          <li>you can join any open group</li>
          <li>To join a closed group, you must submit an application to join the group, when your application is approved you will join the ranks of the group members</li>
          <li>there are several buttons in the group management window
            <ol className={styles.listNumeric}>
              <li>"about group" shows contact details, description and type of group</li>
              <li>"post" for posting you photo, video, event & activity for all members in group</li>
              <li>"photo" your group gallery, for storage photos & albums</li>
              <li>"members" showing all members in group</li>
              <li>"request" showing all requests & invites new members</li>
              <li>"edit group" editing group settings, you can change the name, photo, group privacy settings</li>
              <li>"invite" for sending request for invite your friends & any people</li>
              <li>"leave" leaving in group</li>
            </ol>
          </li>
        </ul>
        <p className={styles.firstLine}>communication between users and friends in chat</p>
      </div>
    </>
  )
};

export default Help;
