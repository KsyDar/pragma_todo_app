import { UserRole } from "~/types/userRole";
import type { ServerUser } from "~/types/serverUser";

const users: ServerUser[] = [
  {
    login: "1",
    password: "1",
    role: UserRole.User,
  },
  {
    login: "admin@admin.com",
    password: "67890",
    role: UserRole.Admin,
  },
];

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = users.find(
    (user) => user.login === body.username && user.password === body.password,
  );
  if (user === undefined) {
    setResponseStatus(event, 401);
    return;
  }
  return { username: user.login, role: user.role };
});
