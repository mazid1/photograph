import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
	PEXELS_API_KEY: str(),
	NEXTAUTH_SECRET: str(),
	NODE_ENV: str({ default: "development" }),
});
