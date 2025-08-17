<template>
  <div class="popup">
    <div class="content">
      <h1>{{ props.message }}</h1>
      <div class="image">
        <img src="/assets/images/checked.png" alt="image" loading="lazy">
      </div>
      <NuxtLink :to="localeRoute('/home')" v-if="!route.params.id && !route.path.endsWith('/confirm_cart')">
        <button class="main-btn">
          {{$t('static_texts.back_home')}}
        </button>
      </NuxtLink>
      <button @click="router.replace(localeRoute('/orders/' + props.id), () => {}, () => {}, true)" class="main-btn" v-else-if="route.path.endsWith('/confirm_cart')">
        {{$t('static_texts.go_pay')}}
      </button>
    </div>
  </div>
</template>

<script setup>
  // define route
  const route = useRoute();

  // define router
  const router = useRouter()

  // define locale route
  const localeRoute = useLocaleRoute()

  // define props
  const props = defineProps({
    message : {
      type : String ,
      default : ""
    },
    id : Number
  })
</script>

<style lang="scss" scoped>
  h1{
    font-size: 45px;
    font-weight: 500;
    line-height: 1;
    max-width: 450px;
    margin: 0 auto;
    @media (max-width : 567px){
      font-size: 30px;
    }
  }
  .image{
    margin: 30px auto !important;
    @media (max-width : 567px){
      max-width: 150px !important;
    }
  }
  button.main-btn{
    width: 100%;
  }
</style>