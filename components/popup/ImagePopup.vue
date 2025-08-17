<template>
  <div>
    <div class="popup">
      <div class="content">
        <button class="close_btn" @click="globalStore.handleShowImagePopup(null)">
          <i class="pi pi-times"></i>
        </button>
        <div class="image">
          <img :src="globalStore?.imageSrc" alt="image" loading="lazy">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define emits 
  const globalStore = useGlobalStore()
</script>

<style lang="scss" scoped>
  .popup .content {
    border-radius: 15px !important;
    padding: 10px !important;
    .image{
      margin-bottom: 0 !important;
      max-width: unset !important;
    }
  }
</style>