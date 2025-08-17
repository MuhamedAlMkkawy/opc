<template>
  <div class="popup">
    <div class="content">
      <h3 class="title centered">
        {{$t('addToCartPopup.title')}}
      </h3>
      <div class="image">
        <img src="/assets/images/cart.png" alt="image" loading="lazy">
      </div>
      <div class="flex_buttons">
        <NuxtLink :to="localeRoute('/cart')" class="main-btn">{{$t('addToCartPopup.buttons.viewCart')}}</NuxtLink>
        <NuxtLink :to="localeRoute('/home')" class="main-btn reversed">{{$t('addToCartPopup.buttons.continueShopping')}}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define locale route
  const localeRoute = useLocaleRoute()
</script>

<style lang="scss" scoped>
  h3.title.centered{
    font-size: clamp(18px , 3rem , 40px);
    padding-inline: clamp(10px , 2rem , 20px);
    line-height: 1.2;
  }
  h3.title , 
  .flex_buttons{
    margin-block:20px 10px;
  }
  .popup .content .image{
    max-width: 350px;
  }
  a{
    @include displayFlex();
  }
</style>