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
  setAvatarImg: (avatar: string) => void;
  setBgImg: (BgImage: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setId: (id: string) => void;
  setBorn: (born: string) => void;
  setFamilyStatus: (familyStatus: string) => void;
  setPhone: (phone: string) => void;
  setAboutMe: (aboutMe: string) => void;
  setEmail: (email: string) => void;
  setWork: (work: string) => void;
  setLocation: (location: string) => void;
  setJoined: (joined: string) => void;
  setFriends: (friends: number) => void;
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
      setAvatarImg: (state) => {set({ avatar: state})},
      setBgImg:(state) => {set({ BgImage: state})},
      setFirstName: (state) => {set({ firstName: state})},
      setLastName: (state) => {set({ lastName: state})},
      setId: (state) => {set({ id: state})},
      setBorn: (state) => {set({ born: state})},
      setFamilyStatus: (state) => {set({ familyStatus: state})},
      setPhone: (state) => {set({ phone: state})},
      setAboutMe: (aboutMe) => {set({ aboutMe: aboutMe})},
      setEmail: (state) => {set({ email: state})},
      setWork: (state) => {set({ work: state})},
      setLocation: (state) => {set({ location: state})},
      setJoined: (state) => {set({ joined: state})},
      setFriends: (state) => {set({friendsCount: state})}
 
    }), { name: 'userStorage', version: 1 })

)