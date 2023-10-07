import type { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser, IUser } from '../dto/sessionDto';

export const authConfig: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {

        if (credentials === undefined || credentials.email === undefined || credentials.password === undefined) return null;

        const url = `${process.env.NEXT_PUBLIC_API}Auth/SignIn?email=${credentials.email}&password=${credentials.password}`;

        try {
          const response = await fetch(url);

          if (response.ok) {
            let result = await response.json();
            result.user.accessToken = result.accessToken;
            return await result.user;
          }
          else {
            return null;
          }
        }
        catch (error) {
          console.error('Ошибка:', error);
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: token,
      };
    },
    jwt: ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        return getUser(token.accessToken as string, session.user as IUser);
      }
      if (user) {
        return user as IUser | any
      }
      return token;
    },
  },
};