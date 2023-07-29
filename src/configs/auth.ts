import type { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
        user: {
          id: token.id,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          gender: token.gender,
          phone: token.phone,
          role: token.role,
          status: token.status,
          lastVisit: token.lastVisit,
          familyStatus: token.familyStatus,
        },
        token: token.accessToken
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          role: u.role,
          status: u.status,
          lastVisit: u.lastVisit,
          firstName: u.firstName,
          lastName: u.lastName,
          gender: u.gender,
          phone: u.phone,
          familyStatus: u.familyStatus,
          accessToken: u.accessToken,
        };
      }
      return token;
    },
  },
};