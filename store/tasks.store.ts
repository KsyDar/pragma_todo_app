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

  function localPaginatedFetch(page: number, pageSize: number) {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return tasks.value.slice(start, end)
  }

  function sortTasks(method: (a: Task, b: Task) => number) {
    tasks.value = tasks.value.sort(method)
  }

  return {
    tasks,
    fetchToDos,
    sortTasks,
    localPaginatedFetch
  }
})
