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
       
      fetchUser: async () => {
        const session = await getSession()
        try {
          const response = await UserService.getUser(session?.user.id as string)
          
          set({ avatar: response?.avatarUrl!});
          set((state) => ({ BgImage: (state.BgImage = response?.backgroundUrl!)}));
          set((state) => ({ id: (state.id = response?.id!)}));
          set((state) => ({ firstName: (state.firstName = response?.firstName!)}));
          set((state) => ({ lastName: (state.lastName = response?.lastName!)}));
          set((state) => ({ phone: (state.phone = response?.phone!)}));
          set((state) => ({ familyStatus: (state.familyStatus = response?.familyStatus!)}));
          set((state) => ({ born: (state.born = response?.born!)}));
          set((state) => ({ aboutMe: (state.aboutMe = response?.aboutMe!)}));
          set((state) => ({ email: (state.email = response?.email!)}));
          set((state) => ({ work: (state.work = response?.work!)}));
          set((state) => ({ location: (state.location = response?.location!)}));
          set((state) => ({ joined: (state.joined = response?.joined!)}));
          set((state) => ({ friendsCount: state.friendsCount = 42}));
        }catch (error){
          console.log(error)
        }
      }
      
    }), { name: 'userStorage', version: 2.0 })

)