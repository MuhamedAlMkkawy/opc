<template>
  <div class="order_item" v-for="product in props.products" :key="product.id">
    <div class="sale" v-if="product?.discount_percentage">
      {{product?.discount_percentage}}%
    </div>
    <div class="image">
      <FavButton 
        :productID = "product.id"
        :isFavourite="product.is_favourite"
      />
      <img :src="product.image" alt="image" loading="lazy">
    </div>
    <h5>{{product.name}}</h5>
    <div class="row_item rating">
      <div class="rate">
        <RatingStars :rating="product.rates_average" />
        <p>{{product.rates_count}}</p>
      </div>
      <div class="part_number">
        {{$t('most_products.part_number')}} : {{product.part_number}}
      </div>
    </div>
    <div class="row_item price">
      <p v-if="product.price_after_discount > 0">{{product.price_after_discount}} {{ product.currency }}</p>
      <del v-if="product.price_after_discount > 0">{{product.price}} {{ product.currency }}</del>
      <p v-else>{{product.price}} {{ product.currency }}</p>
    </div>
    <hr>
    <NuxtLink :to="localeRoute('/products/' + product.id)">
      <span>{{ $t('most_products.details_text') }}</span>
      <span :class="`pi pi-angle-${globalStore.lang === 'ar' ? 'left' : 'right'}`"></span>
    </NuxtLink>
  </div>
</template>

<script setup>
  // define Props
  const props = defineProps({
    products : Object
  })

  // define locale route 
  const localeRoute = useLocaleRoute()

  // define globalStore
  const globalStore = useGlobalStore()
</script>

<style lang="scss" scoped>

</style>