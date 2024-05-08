import createUser from "@/lib/createUser";
import getUserByEmail from "@/lib/getUserByEmail";
import { Context } from "@netlify/functions";
import { hash } from "bcrypt";

export default async function register(req: Request, context: Context) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return Response.json(
      { error: "Missing name, email, or password" },
      { status: 400 }
    );
  }

  const user = await getUserByEmail(email);

  if (user) {
    return Response.json(
      { error: "User already exists" },
      {
        status: 400,
      }
    );
  }

  const passwordHash = await hash(password, 10);
  const userCreate = await createUser({ name, email, passwordHash });

  return Response.json(
    { ...userCreate, passwordHash: undefined },
    { status: 201 }
  );
}
