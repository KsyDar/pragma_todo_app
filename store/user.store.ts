import type { User } from "~/types/user";

export const useUserStore = defineStore("user", () => {
  /** Пользователь из куки */
  const userCookie = useCookie<User | null>("user");
  /** Пользователь */
  const user = ref<User | null>(null);

  if (userCookie.value) {
    user.value = userCookie.value;
  }
  /**
   * Авторизация
   * @param username - логин
   * @param password - пароль
   */
  const login = async (
    username: string,
    password: string,
  ): Promise<{ isError: boolean }> => {
    try {
      const userResponse = await $fetch<User>("/api/login", {
        method: "POST",
        body: {
          username: username,
          password: password,
        },
      });
      userCookie.value = userResponse;
      user.value = userResponse;
      return {
        isError: false,
      };
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      return { isError: true };
    }
  };
  /**
   * Выход из профиля
   */
  const logout = () => {
    userCookie.value = null;
    user.value = null;
  };

  return {
    login,
    logout,
    user,
  };
});
