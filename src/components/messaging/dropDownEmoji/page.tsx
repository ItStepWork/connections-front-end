import styles from './styles.module.scss'
import { useState } from "react";
import { FaSmile } from 'react-icons/fa'
import { Emoji } from '../emoji/page';

export function DropDownEmoji(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const emojis = ["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😮","😵","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👻"];

  return (
    <>
      <div className={styles.container}>
        <button type="button"  {...isOpen?{className:"bg-buttonRed rounded-lg px-2 py-1 fill-white"}:{className:"bg-redOpacity rounded-lg px-2 py-1 fill-buttonBlue"}} onClick={() => {if(!isOpen)setIsOpen(true)}} onFocus={() => {if(isOpen)setIsOpen(true)}} onBlur={() => setIsOpen(false)}>
          <FaSmile {...isOpen?{className:"fill-white"}:{className:"fill-buttonRed"}}/>
          
          {isOpen &&
            <div className={styles.dropMenu}>
              {emojis.map((emoji,index)=>{
                return(<Emoji key={index} emoji={emoji} addEmoji={props.addEmoji}/>)
              })}
            </div>
          }
        </button>
      </div>
    </>
  )
}