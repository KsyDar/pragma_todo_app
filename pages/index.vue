<template>
  <section>
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

    <TaskSorting class="tasks__select" @sort="sort"/>

    <ul class="tasks__list">
      <TaskCard v-for="task of paginatedTasks" :key="task.id" :task="task"/>
    </ul>
  </section>

</template>

<script setup lang="ts">
import {useTaskStore} from "~/store/tasks.store";
import {useOffsetPagination} from "@vueuse/core";
import type {Task} from "~/types/task";
import UIButton from "~/components/ui/UIButton/UIButton.vue";
import TaskCard from "~/components/tasks/TaskCard.vue";
import TaskSorting from "~/components/tasks/TaskSorting.vue";

const taskStore = useTaskStore()
await taskStore.fetchToDos()

const paginatedTasks = ref<Task[]>([])
const page = ref(1)
const pageSize = ref(3)

const fetchLocalPaginatedData = ({currentPage, currentPageSize}: { currentPage: number, currentPageSize: number }) => {
  paginatedTasks.value = taskStore.localPaginatedFetch(currentPage, currentPageSize)
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
  total: computed(() => taskStore.tasks.length),
  page: page,
  pageSize: pageSize,
  onPageChange: fetchLocalPaginatedData,
  onPageSizeChange: fetchLocalPaginatedData,
})

const sort = (method: (a: Task, b: Task) => number) => {
  taskStore.sortTasks(method)
  page.value = 1
  fetchLocalPaginatedData({
    currentPage: page.value,
    currentPageSize: pageSize.value,
  })
}
</script>

<style lang="scss">

.tasks {
  &__list {
    padding: 2.4rem;
  }

  &__select {
    max-width: 400px;
    margin-top: 1.2rem;
  }
}


</style>

