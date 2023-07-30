import type { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser, IUser } from './sessionDto';

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

        const url = `${process.env.NEXT_PUBLIC_STRAPI_API}Auth/SignIn?email=${credentials.email}&password=${credentials.password}`;

        try {
          const response = await fetch(url);

          if (response.ok) {
            return await response.json();
          }
          else {
            return null;
          }
        }
        catch (error) {
          console.error('Ошибка:', error);
        }

        // return await axios
        //   .get(url)
        //   .then((response) => {
        //     return response.data;
        //   })
        //   .catch((error) => {
        //     console.log("error: " + error);
        //     throw new Error(error.response.data.message);
        //   }) || null;

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