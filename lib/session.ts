import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import jsonwebtoken from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // jwt: {
  //     encode: async ({ secret, token}) => {

  //     },
  //     decode: async ({ secret, token }) => {

  //     }
  // },
  theme: {
    logo: "/logo.png",
    colorScheme: "light",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },

    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
