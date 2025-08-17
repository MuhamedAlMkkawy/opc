import { defineNuxtRouteMiddleware } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to, from) => {
  // define global store
  const globalStore = useGlobalStore()

  // Check for the protected routes and if the user is not logged in, redirect to the login page
  if (
    to.path != '/' && 
    to.path != '/ar' && 
    !to.path.endsWith('/login') && 
    !to.path.endsWith('/terms') && 
    !to.path.endsWith('/register') && 
    !to.path.endsWith('/activation_code') && 
    !to.path.endsWith('/home') && 
    // !to.path.includes('/products/') && 
    !useCookie('authStore').value
  ) {
    setTimeout(() => {
      globalStore.handleShowLoginPopup()
    },1000)
  } else if (
    useCookie('authStore').value && 
    (
      from.path.endsWith('register') || 
      from.path.endsWith('login') || 
      from.path == '/' || 
      from.path == '/ar' 
    )
  ) {
      location?.assign(globalStore.lang == 'ar' ? '/ar/home' : '/home')
  }
})