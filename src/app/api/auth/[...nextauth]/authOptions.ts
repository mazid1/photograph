import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { env } from "@/lib/env";
import getUserByEmail from "@/lib/getUserByEmail";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email address",
          type: "email",
          placeholder: "jon.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error("Wrong credentials. Try again.");
        }

        const user = await getUserByEmail(email);

        if (!user) {
          throw new Error("Wrong credentials. Try again.");
        }

        const isValid = await compare(password, user.passwordHash);

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return { ...user, id: String(user.id), passwordHash: undefined };
      },
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account && account.provider === "credentials") {
        token.userId = account.providerAccountId;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        id: token.userId as string,
      } as SessionUser;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
  debug: env.NODE_ENV === "development",
};
