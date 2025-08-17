<template>
  <div class="breadcrumb">
    <h3 class="title">
      {{ globalStore.lang == 'ar' ? 'منتجات' : 'Products of' }}
      {{getResult?.brands.filter((item)=> item.id == globalStore.brand_data.id)[0]?.name}} 
    </h3>
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  onMounted(()=>{
    getMethod('search-data' , '' , false , false)
  })
</script>

<style lang="scss" scoped>
  h3.title{
    margin: 0;
  }
</style>