import { getStore } from "@netlify/blobs";

const getUserByEmail = async (email: string) => {
  const userStore = getStore("user");
  const user = await userStore.get(email, { type: "json" });
  console.log("getUserByEmail", user);
  return user;
};

export default getUserByEmail;
