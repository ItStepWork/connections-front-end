'use client'
import { UserService } from "@/services/user.service";
import { useStore } from "@/stores/userDataStore";
import { faker } from "@faker-js/faker";
import { getSession } from 'next-auth/react';

import { useEffect } from "react";
export const UserStoreDto = () => {
  
  let [avatarImg, bgImg, firstName, lastName, id, phone, 
    familyStatus, born, aboutMe, email, work, location, joined, friends] = useStore((state) => 
  [state.setAvatarImg, state.setBgImg, state.setFirstName, state.setLastName, state.setId,
    state.setPhone, state.setFamilyStatus, state.setBorn, state.setAboutMe,
      state.setEmail, state.setWork, state.setLocation, state.setJoined, state.setFriends])

      
      const getData = async () => {
        const session = await getSession();
        const userData = await UserService.getUser(session?.user?.id!);
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