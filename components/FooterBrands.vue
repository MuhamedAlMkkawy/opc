<template>
  <div class="footer_tab images">
    <div class="image" v-for="brand in getResult" :key="brand.id">
      <img :src="brand.image" alt="image" loading="lazy">
    </div>
  </div>
</template>

<script setup>
  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  onMounted(()=>{
    getMethod('payment-brands' , '' , false , false)
  })
</script>

<style lang="scss" scoped>
  .images{
    @include displayFlex($justify : flex-end);
    padding-inline-end: 20px;
  }
</style>