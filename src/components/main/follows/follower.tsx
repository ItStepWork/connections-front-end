import { faker } from "@faker-js/faker";
import Image from 'next/image';
import { FC } from "react";
import { BsFillPersonCheckFill, BsPlusLg } from "react-icons/bs";
import styles from "./follows.module.scss";

interface IFollowerProps {
  checked: boolean
}

export const Follower:FC<IFollowerProps> = ({checked}) => {
  return (
    <>
      <div className={styles.followerContainer}>
        <div className={styles.avatar}>
        <Image
              src={faker.image.avatar()}
              width={48}
              height={48}
              quality={80}
              style={{ objectFit: "contain" }}
              alt="avatar"
            />
        </div>
        <div className={styles.userInfo}>
          <p>{faker.person.fullName()}</p>
          <span>{faker.company.name()}</span>
        </div>
        <div className="">
          <button className={!checked ? styles.button : styles.buttonChecked}>{!checked ? <BsPlusLg size={16}/> : <BsFillPersonCheckFill size={16}/>}</button>
        </div>
      </div>
    </>
  )
}