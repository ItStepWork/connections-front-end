'use client'
import { useStore } from "@/stores/userDataStore";
import { faker } from "@faker-js/faker";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


export const UserStoreDto = () => {

  const { data: session } = useSession();
  let [avatarImg, bgImg, firstName, lastName, id, phone, 
    familyStatus, born, aboutMe, email, work, location, joined, friends] = useStore((state) => 
  [state.setAvatarImg, state.setBgImg, state.setFirstName, state.setLastName, state.setId,
    state.setPhone, state.setFamilyStatus, state.setBorn, state.setAboutMe,
      state.setEmail, state.setWork, state.setLocation, state.setJoined, state.setFriends])

  
  
  useEffect(() => {
    avatarImg(faker.image.avatar());
    bgImg(faker.image.url());
    firstName(session?.user?.firstName!);
    lastName(session?.user?.lastName!);
    id(session?.user?.id!);
    phone(session?.user?.phone!);
    familyStatus(session?.user?.familyStatus!);
    born(session?.user?.born!);
    aboutMe(session?.user?.aboutMe!);
    email(session?.user?.email!);
    work(session?.user?.work!);
    location(session?.user?.location!);
    joined(session?.user?.joined!);
    friends(42);
  }, [session])
  
 
  return (<> </>)
}