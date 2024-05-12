import * as fs from "node:fs";
import type {Task} from "~/types/task";
import {v4} from "uuid";
import {TaskStatus} from "~/types/taskStatus";

function createDefaultTasks(): Task[] {
  return [
    {
      id: v4(),
      description: "description 1",
      email: "user@user.ru",
      name: "name 1",
      status: TaskStatus.NotDone
    },
    {
      id: v4(),
      description: "description 2",
      email: "user@user.ru",
      name: "name 2",
      status: TaskStatus.NotDone
    },
    {
      id: v4(),
      description: "description 3",
      email: "user@user.ru",
      name: "name 3",
      status: TaskStatus.NotDone
    }]
}

const filename = "todos.json";

export default defineEventHandler(async () => {
  if(!fs.existsSync(filename)) {
    fs.writeFileSync(filename, JSON.stringify(createDefaultTasks()));
  }
  return JSON.parse(fs.readFileSync(filename).toString())
})
