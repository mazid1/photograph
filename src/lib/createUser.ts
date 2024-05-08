import { getStore } from "@netlify/blobs";

type CreateUserDto = {
  name: string;
  email: string;
  passwordHash: string;
};

const createUser = async (createUserDto: CreateUserDto) => {
  const userStore = getStore("user");
  const newUser = { ...createUserDto, id: createUserDto.email };
  await userStore.setJSON(createUserDto.email, newUser);
  return newUser;
};

export default createUser;
