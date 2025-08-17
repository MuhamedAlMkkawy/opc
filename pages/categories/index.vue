<template>
  <div class="page">
    <div class="container">
      <h3 class="title centered">
        {{$t('categories.title')}}
      </h3>
      <div class="categories_content" v-if="getResult?.length > 0">
        <div class="category" v-for="category in getResult" :key="category.id">
          <div class="info">
            <div class="image">
              <img :src="category.image" alt="image" loading="lazy">
            </div>
            <h4>{{category.name}}</h4>
          </div>
          <hr>
          <NuxtLink
            @click="globalStore.storeProductInfo(category.id , '')" 
            :to="localeRoute('/categories/' + category.id)">
            <span>{{$t('categories.view_product')}}</span>
            <i :class="`pi pi-angle-${globalStore.lang == 'ar' ? 'left' : 'right'}`"></i>
          </NuxtLink>
        </div>
      </div>
      <Empty v-else />
    </div>
  </div>
</template>

<script setup>
  // define locale route
  const localeRoute = useLocaleRoute()

  // define globalStore
  const globalStore = useGlobalStore()

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()


  onMounted(() => {
    getMethod('categories', 1 , false, false)
  })
</script>

<style lang="scss" scoped>
  .page{
    h3.title{
      font-size: clamp(20px , 4vw , 32px);
    }
  }
</style>