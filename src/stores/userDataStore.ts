import { FriendService } from '@/services/friend.service';
import { UserService } from '@/services/user.service';
import { getSession } from 'next-auth/react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  avatar: string;
  BgImage: string ;
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  familyStatus: string;
  born: string;
  aboutMe: string;
  email: string;
  work: string;
  location: string;
  joined: string;
  friendsCount: number;
  gender: number;
  fetchUser: any;
}

const sessionData = async () => {
  const session = await getSession()
  return session?.user?.id;
}

export const useStore = create<User>()(
  persist(
    (set) => ({
      avatar:'', 
      BgImage:'',
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      familyStatus: '',
      born:'',
      aboutMe: '',
      email: '',
      work: '',
      location: '',
      joined: '',
      friendsCount: 0,
      gender: 0,
       
      fetchUser: async () => {
        const session = await getSession()
        try {
          const responseUser = await UserService.getUser(session?.user.id as string)
          const responseFriends = await FriendService.getFriends();
          
          set({ avatar: responseUser?.avatarUrl!});
          set((state) => ({ BgImage: (state.BgImage = responseUser?.backgroundUrl!)}));
          set((state) => ({ id: (state.id = responseUser?.id!)}));
          set((state) => ({ firstName: (state.firstName = responseUser?.firstName!)}));
          set((state) => ({ lastName: (state.lastName = responseUser?.lastName!)}));
          set((state) => ({ phone: (state.phone = responseUser?.phone!)}));
          set((state) => ({ familyStatus: (state.familyStatus = responseUser?.familyStatus!)}));
          set((state) => ({ born: (state.born = responseUser?.born!)}));
          set((state) => ({ aboutMe: (state.aboutMe = responseUser?.aboutMe!)}));
          set((state) => ({ email: (state.email = responseUser?.email!)}));
          set((state) => ({ work: (state.work = responseUser?.work!)}));
          set((state) => ({ location: (state.location = responseUser?.location!)}));
          set((state) => ({ joined: (state.joined = responseUser?.joined!)}));
          set((state) => ({ gender: (state.gender = responseUser?.gender!)}));
          set((state) => ({ friendsCount: (state.friendsCount = responseFriends?.friendsCount!)}));
        }catch (error){
          console.log(error)
        }
      }
      
    }), { name: 'userStorage', version: 2.0 })

)