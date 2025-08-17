<template>
  <div class="popup">
    <div class="content">
      <h3 class="title centered">
        {{$t('saved_addresses.delete_title')}}
      </h3>
      <i class="pi pi-trash"></i>
      <div class="flex_buttons">
        <button class="main-btn reversed" @click="$emit('handleShowDeleteAddressPopup')">
          {{ $t('static_texts.back') }}
        </button>
        <button class="main-btn danger" @click="$emit('handleDeleteAddress')">
          {{ $t('static_texts.delete') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.content{
  // padding-block: 60px;
}
  i.pi{
    font-size: 150px;
    color: $secColor;
    // margin-bottom: 20px;
    margin-block: 50px 100px;
  }
  h3.title{
    font-size: clamp(20px, 4vw, 40px);
    font-weight: 500;
    margin-bottom: 12px;
    padding-inline: 15px;
  }
  p.text{
    font-size: clamp(18px , 4vw , 24px);
    font-weight: 500;
  }

  .flex_buttons{
    .main-btn{
      margin-top: 0;
    }
  }
</style>