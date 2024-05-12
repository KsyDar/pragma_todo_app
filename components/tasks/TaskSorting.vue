<template>
  <UISelect
      v-model="selectedSortingMethod"
      name="sorting"
      :items="sortingItems"
      placeholder="Поле для сортировки"/>
</template>

<script setup lang="ts">
import UISelect from "~/components/ui/UISelect/UISelect.vue";
import type {Task} from "~/types/task";

type EmitTypes = {
  'sort': [(a: Task, b: Task) => number]
}

const emits = defineEmits<EmitTypes>()

const sortingItems = ['Name (ASC)', 'Name (DESC)', 'Email (ASC)', 'Email (DESC)', 'Status (ASC)', 'Status (DESC)']
const sortingMethods: Record<string, (a: Task, b: Task) => number> = {
  'Name (ASC)': (a: Task, b: Task) => a.name > b.name ? 1 : -1,
  'Name (DESC)': (a: Task, b: Task) => a.name > b.name ? -1 : 1,
  'Email (ASC)': (a: Task, b: Task) => a.email > b.email ? 1 : -1,
  'Email (DESC)': (a: Task, b: Task) => a.email > b.email ? -1 : 1,
  'Status (ASC)': (a: Task, b: Task) => a.status - b.status,
  'Status (DESC)': (a: Task, b: Task) => b.status - a.status,
}
const selectedSortingMethod = ref<string>('Name (ASC)')

watch(selectedSortingMethod, () => {
  const method = sortingMethods[selectedSortingMethod.value]
  if (method === undefined) {
    throw new Error("Sorting method not found")
  }
  emits("sort", method)
}, {immediate: true})

</script>

<style scoped lang="scss">

</style>
