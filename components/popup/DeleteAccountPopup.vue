<template>
  <div class="popup">
    <div class="content">
      <i class="pi pi-trash"></i>
      <h3 class="title centered">
        {{$t('delete_account.title')}}
      </h3>
      <p class="text">
        {{$t('delete_account.text')}}
      </p>
      <div class="flex_buttons">
        <button class="main-btn reversed" @click="emit('handleShowDeleteAccountPopup')">
          {{ $t('static_texts.back') }}
        </button>
        <button class="main-btn danger" @click="emit('handleDeleteAccount')">
          {{ $t('static_texts.delete') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define Emits
  const emit = defineEmits(['handleShowDeleteAccountPopup' , 'handleDeleteAccount'])
</script>

<style lang="scss" scoped>
  i.pi{
    font-size: 100px;
    color: $secColor;
    margin-bottom: 20px;
  }
  h3.title{
    font-size: clamp(20px, 4vw, 40px);
    font-weight: 500;
    margin-bottom: 12px;
  }
  p.text{
    font-size: clamp(18px , 4vw , 24px);
    font-weight: 500;
  }
</style>