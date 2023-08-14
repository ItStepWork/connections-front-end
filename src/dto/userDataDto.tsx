'use client'
import { UserService } from "@/services/user.service";
import { useStore } from "@/stores/userDataStore";
import { faker } from "@faker-js/faker";
import { useSession } from "next-auth/react";

import { useEffect } from "react";
export const UserStoreDtoMain = (props: any) => {
  
  let [avatarImg, bgImg, firstName, lastName, id, phone, 
    familyStatus, born, aboutMe, email, work, location, joined, friends] = useStore((state) => 
  [state.setAvatarImg, state.setBgImg, state.setFirstName, state.setLastName, state.setId,
    state.setPhone, state.setFamilyStatus, state.setBorn, state.setAboutMe,
      state.setEmail, state.setWork, state.setLocation, state.setJoined, state.setFriends])

      
      const getData = async () => {
        UserService.token = props.session?.user?.accessToken!;
        const userData = await UserService.getUser(props.session?.user?.id!);
        avatarImg(userData.avatarUrl ? userData.avatarUrl : faker.image.avatar());
        bgImg(userData.backgroundUrl! ? userData.backgroundUrl! : faker.image.avatar());
        firstName(userData.firstName!);
        lastName(userData.lastName!);
        id(userData.id!);
        phone(userData.phone!);
        familyStatus(userData.familyStatus!);
        born(userData.born!);
        aboutMe(userData.aboutMe!);
        email(userData.email!);
        work(userData.work!);
        location(userData.location!);
        joined(userData.joined!);  
        friends(42);       
    }
    
  useEffect(() => {
    getData();
  },[])
 
  return (<> </>)
}
export const UserStoreDto = () => {
  const { data: session } = useSession();
  if (session === undefined) {
    return (<></>);
  }
  else
    return (
      <UserStoreDtoMain session={session} />
    )
}