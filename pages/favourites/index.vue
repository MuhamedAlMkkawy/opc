<template>
  <div class="page fav_page">
    <div class="container" v-if="getResult?.length > 0">
      <h1 class="page_title">
        {{$t('favourites.title')}}
      </h1>
      <div class="orders" v-if="getResult">
        <div class="content">
          <ProductItem 
            :products="getResult"
          />
        </div>
      </div>
      <Empty v-else />
    </div>
    <Empty v-else />
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore();

  // define api methods 
  const {
    getMethod,
    getResult
  } = useApiMethods()

  onMounted(()=>{
    getMethod(`favourites?device_id=${globalStore.device_id}&user_type=${globalStore.userType}` , 1,true , false)
  })
</script>

<style lang="scss" scoped>
.order_item:not(:last-of-type){
  margin-bottom: 0;
}
</style>