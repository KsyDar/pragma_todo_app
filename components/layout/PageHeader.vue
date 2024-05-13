<template>
  <header class="header">
    <h1 class="header__title">To Do App</h1>
    <UIButton @click="logout">Logout</UIButton>
  </header>
</template>

<script setup lang="ts">
import UIButton from "~/components/ui/UIButton/UIButton.vue";
import { useUserStore } from "~/store/user.store";

const userStore = useUserStore();
const router = useRouter();
/**
 * Выход из аккаунта
 */
const logout = async () => {
  userStore.logout();
  await router.push("/auth");
};
</script>

<style lang="scss">
.header {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background-color: #f6f8fa;
  box-shadow: inset 0 calc(max(1px, 0.0625rem) * -1) #d0d7de;

  &__title {
    font-size: 2.4rem;
    font-weight: 600;
  }
}
</style>
