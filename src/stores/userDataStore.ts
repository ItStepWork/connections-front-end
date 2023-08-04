
import { faker } from '@faker-js/faker';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSession } from 'next-auth/react';

interface User {
  avatar: string,
  BgImage: string,
  
}


const useStore = create<User>()(
  persist(
    (set) => ({
      avatar: faker.image.avatar(),
      BgImage: faker.image.url(),
 
    }), { name: 'userStorage', version: 1 })

)
export default useStore;