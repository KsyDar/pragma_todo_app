<template>
  <section class="login">
    <h1 class="login__title">Login</h1>
    <UIForm
        method="post"
        :validation-schema="validationSchema"
        class="login__form"
        @submit="loginAction"
    >
      <template #inputs>
        <UIInput
            name="username"
            type="text"
            placeholder="Username"
            label="Username"
            class="login__form-input"
        />
        <UIInput
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
            class="login__form-input"
        />
      </template>
      <template #buttons="{ isValid }">
        <UIButton class="login__form-button" type="submit" :disabled="!isValid"
        >Login
        </UIButton
        >
      </template>
    </UIForm>
  </section>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/user.store";
import UIButton from "~/components/ui/UIButton/UIButton.vue";
import UIInput from "~/components/ui/UIInput/UIInput.vue";
import UIForm from "~/components/ui/UIForm/UIForm.vue";
import {toTypedSchema} from "@vee-validate/zod";
import {object, string} from "zod";
import type {GetGenericType} from "~/types/getGenericType";

const userStore = useUserStore();
const router = useRouter();

definePageMeta({
  layout: "auth",
});

/** Схема валидации */
const validationSchema = toTypedSchema(
    object({
      username: string().min(1),
      password: string().min(1),
    }),
);
/** Тип полей формы */
type FormValueType = GetGenericType<typeof validationSchema>;
/**
 * Авторизация
 * @param values - поля формы
 */
const loginAction = async (values: FormValueType) => {
  const result = await userStore.login(
      values.username || "",
      values.password || "",
  );
  if (!result.isError) {
    await router.push("/");
  }
};
</script>

<style lang="scss">
@use 'assets/variables/colors' as *;

.login {
  display: flex;
  min-width: 300px;
  flex-direction: column;
  padding: 1.6rem;
  border: 1px solid $shadowColor;
  border-radius: 6px;
  margin: auto;
  background-color: $primaryMainColor;
  font-size: 14px;

  &__title {
    margin-bottom: 1.6rem;
    color: black;
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-input {
      margin-bottom: 1.6rem;
    }

    &-button {
      width: 100%;
    }
  }
}
</style>
