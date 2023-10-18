import Prisma from '@/libs/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { User } from '@prisma/client';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(Prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialProvider({
      name: 'credentails',
      credentials: {
        phone: {
          label: 'phone',
          type: 'text',
        },
      },

      async authorize(credentails) {
        if (!credentails?.phone) return null;

        const user = await Prisma.user.findUnique({
          where: { phone: credentails.phone },
        });

        if (!user) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session }) => {
      return {
        ...session,
        user: {
          ...session.user,
          // phone: token.phone,
        },
      };
    },
    jwt: ({ token, user }) => {
      const u = user as unknown as User;
      if (user) {
        return {
          ...token,
          // phone: u.phone,
        };
      }

      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
