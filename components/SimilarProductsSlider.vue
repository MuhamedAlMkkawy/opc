<template>
  <h3 class="title">{{$t('product_details_page.similar_products_tab')}}</h3>
  <section class="orders">
    <div class="content">
      <Carousel v-bind="config">
        <Slide v-for="item in props.products" :key="item.id">
          <div class="order_item">
            <div class="image">
              <FavButton 
                :productID = "item.id"
                :isFavourite="item.is_favourite"
              />
              <img :src="item.image" alt="image" loading="lazy">
            </div>
            <h5>{{item.name}}</h5>
            <div class="row_item rating">
              <div class="rate">
                <RatingStars :rating="item.rates_average" />
                <p>{{item.rates_count}}</p>
              </div>
              <div class="part_number">
                {{$t('product_details_page.part_number')}} {{item.part_number}}
              </div>
            </div>
            <div class="row_item price">
              <p v-if="item.price_after_discount > 0">{{item.price_after_discount}} {{ item.currency }}</p>
              <del v-if="item.price_after_discount > 0">{{item.price}} {{ item.currency }}</del>
              <p v-else>{{item.price}} {{ item.currency }}</p>
            </div>
            <hr>
            <NuxtLink :to="localeRoute('/products/' + item?.id)">
              <span>{{$t('product_details_page.details_text')}}</span>
              <span :class="`pi pi-angle-${globalStore.lang == 'ar' ? 'left' : 'right'}`"></span>
            </NuxtLink>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup>
  import 'vue3-carousel/carousel.css';
  import { Carousel, Slide, Navigation } from 'vue3-carousel';

  // define global Store
  const globalStore = useGlobalStore()

  // define locale route 
  const localeRoute = useLocaleRoute();

  const config = {
    height: 400,
    itemsToShow: 5,
    gap: 5,
    autoplay: 2000,
    snapAlign: globalStore.lang == 'ar' ? 'end' : 'start',
    transition: 2000,
    wrapAround: true,
    dir: globalStore.lang == 'ar' ? 'rtl' : 'ltr',
    breakpoints: {
      1440: {
        itemsToShow: 5,
        gap: 10,
      },
      1024: {
        itemsToShow: 4,
        gap: 10,
      },
      992: {
        itemsToShow: 3,
        gap: 10,
      },
      567: {
        itemsToShow: 2,
        gap: 15,
      },
      320: {
        itemsToShow: 1,
        gap: 20,
      },
    },
  };

  // define props 
  const props = defineProps({
    products : Object
  })
</script>

<style lang="scss" scoped>
  h3.title{
    text-align: start;
    margin: 0 0 10px;
    font-size: clamp(14px , 4vw , 22px);
  }
  .orders{
    padding: 0;
    .content{
      display: unset !important;
      .order_item{
        flex-grow: 1;
        // height: 356px;
        h5{
          font-size: 16px;
        }
      }
    }
  }
</style>
