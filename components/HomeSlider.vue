<template>
  <div class="home_slider">
    <Carousel id="product_gallery" v-bind="galleryConfig" v-model="currentSlide">
      <Slide v-for="slide in props.sliderImages" :key="slide.id">
        <img :src="slide.image" @click="globalStore.handleShowImagePopup(slide.image)" alt="Gallery Image" class="gallery-image" />
      </Slide>
      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>


<script setup>
  import 'vue3-carousel/carousel.css';
  import { Carousel, Slide, Pagination } from 'vue3-carousel';
  
  // define global store
  const globalStore = useGlobalStore()

  const currentSlide = ref(0);

  const slideTo = (nextSlide) => (currentSlide.value = nextSlide);

  const galleryConfig = {
    width : '100%',
    height : '500px' ,
    itemsToShow: 1,
    wrapAround: true,
    slideEffect: 'fade',
    mouseDrag: false,
    touchDrag: false,
    autoplay: 1500, // Enables autoplay
    duration: 3000, // Time interval between slides (in milliseconds)
  };

  // define props
  const props = defineProps({
    sliderImages : {
      type : Object ,
      default : ''
    }
  })
</script>

<style lang="scss" scoped>
  .home_slider{
    flex-grow: 1;
  }
</style>