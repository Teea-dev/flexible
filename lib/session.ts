import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import jsonwebtoken from "jsonwebtoken";
import { SessionInterface, userProfile } from "../common.types";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: async ({ secret, token }) => {
      try {
        console.log({ token, encode: true });

        const encodedToken = jsonwebtoken.sign(
          {
            ...token,
            iss: "grafbase",
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          secret
        );
        return encodedToken;
      } catch (error) {
        console.log("Error encoding token");
        return "";
      }
    },
    decode: async ({ secret, token }) => {
      try {
        console.log({ token, decode: true });
        const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;
        return decodedToken;
      } catch (error) {
        console.log("Error decoding token");
        return null;
      }
    },
  },
  theme: {
    logo: "/logo.png",
    colorScheme: "light",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const data = (await getUser(email)) as { user?: userProfile };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data.user,
          },
        };
        return newSession;
      } catch (error) {
        console.log("Error returning new session");
        return session;
      }
    },

    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const userExists = (await getUser(user?.email as string)) as {
          user?: userProfile;
        };

        if (!userExists.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }

        return true;
      } catch (error: any) {
        return false;
      }
    },
  },
};

//CREATE UTILITY FUNCTION TO HANDLE TRUE FOR LOGGED IN AND FALSE FOR NOT LOGGED IN

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
