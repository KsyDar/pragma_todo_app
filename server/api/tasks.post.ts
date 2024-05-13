import * as fs from "node:fs";

const filename = "todos.json";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const tasks = JSON.parse(fs.readFileSync(filename).toString());
  tasks.push(body.task);
  fs.writeFileSync(filename, JSON.stringify(tasks));
});
