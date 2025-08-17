<template>
  <div>
    <div class="popup">
      <div class="content">
        <button class="pi pi-times close_btn" @click="emit('handleShowChargePopup')"></button>
        <div class="image">
          <img src="/assets/images/wallet_popup.png" alt="image" loading="lazy">
        </div>
        <h3 class="title">
          {{ $t('wallet.popup_title') }}
        </h3>
        <h4></h4>
        <label for="money">{{ $t('wallet.popup_inputText') }}</label>
        <div class="input">
          <input 
            type="text"
            :placeholder="$t('wallet.popup_inputText')"
            v-model="body.amount"
            @keydown.prevent.enter="emit('handleCharge' , body)"
          >
        </div>
        <button class="main-btn" @click="emit('handleCharge' , body)">
          {{$t('wallet.charge')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  

  // define body
  const body = ref({
    amount : ""
  })

  // define Emits
  const emit = defineEmits(['handleShowChargePopup', 'handleCharge'])
</script>

<style lang="scss" scoped>
  h3.title{
    margin-bottom: 27px;
    font-size: clamp(20px , 4vw , 42px);
    color: $textColor;
  }
</style>