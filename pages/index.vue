<template>
  <h1>Test</h1>
</template>

<script setup lang="ts">
  import {useTaskStore} from "~/store/tasks.store";

  const taskStore = useTaskStore()
  onMounted(() => {
    console.log(taskStore.tasks)

  })
</script>

