"use client"
import { useState } from "react";
import { FaSmile } from 'react-icons/fa';
import { Emoji } from '../emoji/page';
import styles from './styles.module.scss';

export function DropDownEmoji(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😮", "😵", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👻"];

  return (
    <>
      <div className={styles.container}>
        <button type="button"  {...isOpen ? { className: "bg-button_red_BG rounded-lg px-2 py-1" } : { className: "bg-button_red_opacity rounded-lg px-2 py-1" }} onClick={() => { if (!isOpen) setIsOpen(true) }} onFocus={() => { if (isOpen) setIsOpen(true) }} onBlur={() => setIsOpen(false)}>
          <FaSmile {...isOpen ? { className: "fill-white" } : { className: "fill-button_red_BG" }} />

          {isOpen &&
            <>
              {props.isLower === false ? (
                <div className={styles.dropMenuUpper}>
                  {emojis.map((emoji, index) => {
                    return (<Emoji key={index} emoji={emoji} addEmoji={props.addEmoji} />)
                  })}
                </div>
              ) : (
                <div className={styles.dropMenuLower}>
                  {emojis.map((emoji, index) => {
                    return (<Emoji key={index} emoji={emoji} addEmoji={props.addEmoji} />)
                  })}
                </div>
              )}
            </>
          }
        </button>
      </div>
    </>
  )
}