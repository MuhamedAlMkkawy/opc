<template>
  <Rating v-model="props.rating" readonly/>

</template>

<script setup>
  import Rating from 'primevue/rating';

  const props = defineProps({
    rating : Number
  })

</script>

<style lang="scss" scoped>

</style>
