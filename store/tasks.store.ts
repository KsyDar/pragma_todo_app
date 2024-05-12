import type {Task} from "~/types/task";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([])

  const fetchToDos = async () => {
    const { data } = await useFetch<Task[]>('/api/tasks', {
      method: "GET"
    })
    if(data.value !== null) {
      tasks.value = data.value
    }
  }

  return {
    tasks,
    fetchToDos
  }
})
