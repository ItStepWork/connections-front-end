export interface IUser {  
    id: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    role: number | null;
    email: string;
    gender: number | null;
    status: number | null;
    familyStatus: string | null;
    born: string | null;
    aboutMe: string | null;
    avatarUrl: string | null;
    backgroundUrl: string | null;
    accessToken: string;
    location: string | null;
    work: string | null;
    joined: string | null;     
}