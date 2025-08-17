<template>
  <div class="popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="globalStore.handleShowLoginPopup()"></button>
      <h3 class="title">{{$t('login_popup.title')}}</h3>
      <div class="image">
        <img src="/assets/images/login.png" alt="image" loading="lazy">
      </div>
      <NuxtLink :to="localeRoute('/')" @click="globalStore.handleShowLoginPopup()" class="main-btn">
        {{$t('login_popup.login_btn')}}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  // define locale route
  const localeRoute = useLocaleRoute()
  // define global store
  const globalStore = useGlobalStore()
</script>

<style lang="scss" scoped>
.popup .content .image{
  margin: 50px auto;
}
</style>  