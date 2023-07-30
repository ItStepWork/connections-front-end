import "next-auth";

declare module "next-auth" {

  interface Session {
    user: {
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
      avatarImg: string | null;
      BgImg: string | null;
      accessToken: string;
      location: string | null;
      work: string | null;
      joined: string | null;
    }
  }
}