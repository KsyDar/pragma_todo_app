import type { Task } from "~/types/task";

type SortFuncType = (a: Task, b: Task) => number;

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  let lastSortMethod: SortFuncType | null = null;

  const fetchToDos = async () => {
    const { data } = await useFetch<Task[]>("/api/tasks", {
      method: "GET",
    });
    if (data.value !== null) {
      tasks.value = data.value;
    }
  };

  function localPaginatedFetch(page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return tasks.value.slice(start, end);
  }

  function sortTasks(method: SortFuncType) {
    lastSortMethod = method;
    tasks.value = tasks.value.sort(lastSortMethod);
  }

  function sortIfNeeded() {
    if (lastSortMethod) {
      tasks.value = tasks.value.sort(lastSortMethod);
    }
  }

  function addNewTask(task: Task) {
    $fetch("/api/tasks", {
      method: "POST",
      body: {
        task: task,
      },
    }).catch((_) => {
      tasks.value = tasks.value.filter((x) => x.id !== task.id);
      sortIfNeeded();
    });

    tasks.value.push(task);
    sortIfNeeded();
  }

  function editTask(task: Task) {
    $fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      body: {
        task: task,
      },
    }).catch((_) => {
      const taskIndex = tasks.value.findIndex((x) => x.id === task.id);
      tasks.value.splice(taskIndex, 1, task);
      sortIfNeeded();
    });

    const taskIndex = tasks.value.findIndex((x) => x.id === task.id);
    tasks.value.splice(taskIndex, 1, task);
    sortIfNeeded();
  }

  return {
    tasks,
    fetchToDos,
    sortTasks,
    localPaginatedFetch,
    addNewTask,
    editTask,
  };
});
