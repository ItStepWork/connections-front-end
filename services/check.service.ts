import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';

export class CheckService {

    static date : Date = new Date(); 

    static async signOut(session: any, error: any) {
        let ticks: number = CheckService.date.getTime();
        if((ticks + 1000) < new Date().getTime()){
            CheckService.date = new Date();
            if (session !== null && error?.response?.status === 401) {
                await signOut();
            }
            if (error?.response?.status === 409) {
                error?.response?.data && toast.info(error?.response?.data, {});
            }
        }
    }

} 