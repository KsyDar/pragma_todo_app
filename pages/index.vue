<template>
  <section>
    <h1>Tasks</h1>
    <ul class="tasks-list">
      <TaskCard v-for="task of paginatedTasks" :key="task.id" :task="task" />
    </ul>

    <div>
      <div>
        total: {{ taskStore.tasks.length }}
      </div>
      <div>
        <UIButton :disabled="isFirstPage" @click="prev">
          prev
        </UIButton>
        <UIButton :disabled="isLastPage" @click="next">
          next
        </UIButton>
      </div>
    </div>

  </section>

</template>

<script setup lang="ts">
import {useTaskStore} from "~/store/tasks.store";
import {useOffsetPagination} from "@vueuse/core";
import type {Task} from "~/types/task";
import UIButton from "~/components/ui/UIButton/UIButton.vue";
import TaskCard from "~/components/tasks/TaskCard.vue";

const taskStore = useTaskStore()
await taskStore.fetchToDos()

const paginatedTasks = ref<Task[]>([])
const page = ref(1)
const pageSize = ref(3)

function localPaginatedFetch(page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return taskStore.tasks.slice(start, end)
}

const fetchLocalPaginatedData = ({currentPage, currentPageSize}: { currentPage: number, currentPageSize: number }) => {
  paginatedTasks.value = localPaginatedFetch(currentPage, currentPageSize)
}

fetchLocalPaginatedData({
  currentPage: page.value,
  currentPageSize: pageSize.value,
})

const {
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: taskStore.tasks.length,
  page: page,
  pageSize: pageSize,
  onPageChange: fetchLocalPaginatedData,
  onPageSizeChange: fetchLocalPaginatedData,
})
</script>

<style lang="scss">
.tasks-list {
  padding: 2.4rem;
}
</style>

