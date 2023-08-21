import { UserService } from "@/services/user.service";
import { faker } from "@faker-js/faker";
import Image from 'next/image';
import { FC, useEffect, useState } from "react";
import { BsFillPersonCheckFill, BsPlusLg } from "react-icons/bs";
import styles from "./follows.module.scss";
interface IFollowerProps {
  checked: boolean;
  firstName: string;
  lastName: string;
  work: string;
  avatar: string;
  id: string
}

export const Follower:FC<IFollowerProps> = ({checked, firstName, lastName, work, avatar, id}) => {

  const [friends, setFriends] = useState<any[]>([]);
  const [isCheck, setIsCheck] = useState(false);

  if(firstName === null) firstName = 'ошибка загрузки';
  if(lastName === null) lastName = 'ошибка загрузки';
  
  const addFriend = async () => {
    await UserService.addFriend(id);
    const friends = await UserService.getFriends();
    setFriends(friends);
  } 

  useEffect(() => {
    friends.map((user) => (
      user.userId === id ? setIsCheck(true) : setIsCheck(false),
      console.log(user.userId)
    )) 
  }, [])
  
  return (
    <>
      <div className={styles.followerContainer}>
        <div  className={styles.avatar}>
        <Image
              src={avatar === null ? faker.image.avatar() : avatar}
              width={48}
              height={48}
              quality={80}
              style={{ objectFit: "contain" }}
              alt="avatar"
              loading="lazy"
            />
        </div>
        <div className={styles.userInfo}>
          <p>{firstName +' '+ lastName}</p>
          <span>{work === '' || work === undefined || work === null ? 'Не указано' : work}</span>
        </div>
        <div className="">
          <button onClick={() => addFriend()} className={!isCheck ? styles.button : styles.buttonChecked}>{!isCheck ? <BsPlusLg size={16}/> : <BsFillPersonCheckFill size={16}/>}</button>
        </div>
      </div>
    </>
  )
}