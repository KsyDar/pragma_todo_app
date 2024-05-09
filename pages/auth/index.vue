<template>
  <section class="login">
    <h1 class="login__title">Login</h1>
    <form class="form" method="post" @submit.prevent="loginAction">
      <input v-model="username" class="form__input" type="text" placeholder="Username">
      <input v-model="password" class="form__input" type="password" placeholder="Password">
      <button type="submit" class="form__button">Login</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/user.store";

definePageMeta({
  layout: 'auth'
})
const userStore = useUserStore()
const username = ref<string>("")
const password = ref<string>("")
const router = useRouter()

const loginAction = async () => {
  const result = await userStore.login(username.value, password.value)
  if(!result.isError) {
   await router.push("/")
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  width: 300px;
  height: 300px;
  flex-direction: column;
  margin: auto;

  &__title {
    margin-bottom: .6rem;
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
    width: 100%;
    padding: 1rem;
    border: 1px solid rgb(0 0 0 / 30%);
    border-radius: .4rem;
    margin-bottom: 1rem;
    color: black;
    font-size: 1.3rem;
    transition: border-color .5s ease;

    &:focus {
      border-color: rgb(0 0 0 / 80%);
    }
  }

  &__button {
    display: inline-block;
    padding: 1rem 1.2rem;
    border-width: 0;
    border-radius: 8px;
    margin: 0;
    background-color: #298e46;
    color: white;
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 500;
    transition: all 200ms;

    &:hover {
      background-color: #2c974b;
    }

    &:focus {
      box-shadow: rgb(46 164 79 / 40%) 0 0 0 3px;
      outline: none;
    }

    &:disabled {
      border-color: rgb(27 31 35 / 10%);
      background-color: #94d3a2;
      color: rgb(255 255 255 / 80%);
      cursor: default;
    }

    &:focus:not(:focus-visible, .focus-visible) {
      box-shadow: none;
      outline: none;
    }
  }
}

</style>
