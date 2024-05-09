import type {User} from "~/types/user";

export const useUserStore = defineStore("user", () => {
  const userCookie = useCookie<User | null>('user')
  const user = ref<User | null>(null)

  if(userCookie.value) {
    user.value = userCookie.value
  }

  const login = async (username: string, password: string): Promise<{ isError: boolean }> => {
    try{
      const userResponse = await $fetch<User>('/api/login', {
        method: "POST", body: {
          username: username,
          password: password
        }
      })
      userCookie.value = userResponse
      user.value = userResponse
      return {
        isError: false
      }
    } catch (e) {
      if(e instanceof Error) {
        console.error(e.message)
      }
      return { isError: true }
    }
  }
  return {
    login,
    user
  }
})
