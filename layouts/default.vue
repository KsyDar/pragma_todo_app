<template>
  <PageHeader />
  <main class="main">
    <slot />
  </main>
</template>

<script setup lang="ts">
import PageHeader from "~/components/layout/PageHeader.vue";
</script>
