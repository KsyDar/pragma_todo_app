<template>
  <section class="login">
    <h1 class="login__title">Login</h1>
    <form class="form" method="post" @submit.prevent="loginAction">
      <UIInput v-model="username" type="text" placeholder="Username" class="form__input" />
      <UIInput v-model="password" type="password" placeholder="Password" class="form__input"/>
      <UIButton class="form__button" type="submit">Login</UIButton>
    </form>
  </section>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/user.store";
import UIButton from "~/components/ui/UIButton/UIButton.vue";
import UIInput from "~/components/ui/UIInput/UIInput.vue";

definePageMeta({
  layout: 'auth'
})
const userStore = useUserStore()
const username = ref<string>("")
const password = ref<string>("")
const router = useRouter()

const loginAction = async () => {
  const result = await userStore.login(username.value, password.value)
  if (!result.isError) {
    await router.push("/")
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  min-width: 300px;
  flex-direction: column;
  padding: 1.6rem;
  border: 1px solid #d0d7deb3;
  border-radius:6px;
  margin: auto;
  background-color: #f6f8fa;
  font-size: 14px;

  &__title {
    margin-bottom: 1.6rem;
    color: black;
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
  }
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__input {
    margin-bottom: 1.6rem;
  }

  &__button {
    width: 100%;
  }
}

</style>
