import {useLocalStorage} from "@vueuse/core";
import type {Task} from "~/types/task";
import {v4} from "uuid";
import {TaskStatus} from "~/types/taskStatus";
import {onMounted} from "vue";

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

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([])
  const localStorage = useLocalStorage<Task[]>("tasks", [])

  onMounted(() => {
    if (import.meta.client) {
      if (localStorage.value.length === 0) {
        localStorage.value = createDefaultTasks()
      }
      tasks.value = localStorage.value.map(x => x)
    }
  })

  return {
    tasks
  }
})
