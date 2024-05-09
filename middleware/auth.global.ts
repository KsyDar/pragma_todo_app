import {useUserStore} from "~/store/user.store";

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()
  if(!userStore.user && to.path !== "/auth") {
    return navigateTo("/auth")
  }

  if(userStore.user && to.path === "/auth") {
    return navigateTo("/")
  }
})
