<template>
  <div class="popup">
    <div class="content">
      <h3 class="title centered">
        {{$t('logoutPopup.title')}}
      </h3>
      <div class="image">
        <img src="/assets/images/logout.png" alt="image" loading="lazy">
      </div>
      <div class="flex_buttons">
        <button 
          class="main-btn danger"   
          @click="handleLogout"
        >
          {{$t('logoutPopup.logout')}}
        </button>
        <button 
          class="main-btn reversed" 
          @click="emit('handleShowLogoutPopup')"
        >
          {{$t('logoutPopup.back')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()

  // define emits 
  const emit = defineEmits(['handleShowLogoutPopup'])

  // define api methods
  const {
    submitMethod
  } = useApiMethods();
  
  const handleLogout = () => {
    useCookie('authStore').value = '';
    useCookie('globalStore').value = '';
    useCookie('i18n_redirected').value = '';
    submitMethod(`sign-out?device_id=${globalStore.device_id}` , true , '' , 'DELETE' , '/' , '');
  }
</script>

<style lang="scss" scoped>
  h3.title , 
  .flex_buttons{
    margin-block:20px 10px;
  }
  .popup .content .image{
    margin: 50px auto;
  }
</style>