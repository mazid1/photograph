import { env } from "@/lib/env";
import { getStore } from "@netlify/blobs";
import { compare } from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export type SessionUser = {
	email: string;
	name: string;
	image?: string;
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

				const userStore = getStore("user");
				const user = await userStore.get(email, { type: "json" });

				if (!user) {
					throw new Error("Wrong credentials. Try again.");
				}

				const isValid = await compare(password, user.password!);

				if (!isValid) {
					throw new Error("Wrong credentials. Try again.");
				}

				return { ...user, password: undefined };
			},
		}),
	],
	jwt: {
		encode: ({ secret, token }) => {
			const encodedToken = jsonwebtoken.sign(
				{
					...token,
					exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
				},
				secret,
			);
			return encodedToken;
		},
		decode: async ({ secret, token }) => {
			const decodedToken = jsonwebtoken.verify(token!, secret);
			return decodedToken as JWT;
		},
	},
	callbacks: {
		jwt: async ({ token, account, trigger, session }) => {
			if (account && account.provider === "credentials") {
				token.userId = account.providerAccountId;
			}
			if (trigger === "update" && session?.user.image) {
				token.picture = session.user.image;
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
