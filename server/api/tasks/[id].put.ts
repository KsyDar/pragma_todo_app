import fs from "node:fs";
import type { Task } from "~/types/task";

const filename = "todos.json";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = event.context.params?.id;
  const tasks = JSON.parse(fs.readFileSync(filename).toString()) as Task[];
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex] = body.task;
  fs.writeFileSync(filename, JSON.stringify(tasks));
});
