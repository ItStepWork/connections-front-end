import { signOut } from 'next-auth/react';

export class CheckService {

    static async signOut(session: any, error: any) {
        if (session !== null && error?.response?.status === 401) {
            await signOut();
        }
    }

} 