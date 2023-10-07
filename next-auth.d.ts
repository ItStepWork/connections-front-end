import "next-auth";
import { Role } from "./enums/all.enum";

declare module "next-auth" {

  interface Session {
    user: {
      id: string;
      firstName: string | null;
      lastName: string | null;
      phone: string | null;
      role: Role;
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
      localization: string; 
    }
  }
}