import axios from 'axios';
import { getSession } from 'next-auth/react';
import { CheckService } from './check.service';

export class ApiService {

    static async get(path: string, error: [] | null | number) {
        const session = await getSession();
        return await axios.get(process.env.NEXT_PUBLIC_API + path, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch(async (error) => {
                console.error(error);
                await CheckService.signOut(session, error);
                return error;
            });
    }
    
    static async post(path: string, object: object | null, formData : FormData | null) {
        const contentType = object ? 'application/json':'multipart/form-data';
        const data = object ? object: formData;
        const session = await getSession();
        return await axios.post(process.env.NEXT_PUBLIC_API + path, data, {
            headers: {
                "Accept": "application/json",
                'Content-Type': contentType,
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch(async (error) => {
                console.error(error);
                await CheckService.signOut(session, error);
                return null;
            });
    }

    static async delete(path: string) {
        const session = await getSession();
        return await axios.delete(process.env.NEXT_PUBLIC_API + path, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + session?.user.accessToken,
            },
        }).then(response => response.data)
            .catch(async (error) => {
                console.error(error);
                await CheckService.signOut(session, error);
                return null;
            });
    }
    
} 