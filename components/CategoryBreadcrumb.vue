<template>
  <div class="breadcrumb">
    <h3>
      {{getResult?.filter(item => item.id == globalStore.productInfo.category)[0]?.name}}
    </h3>
    <span>/</span>
    <h3 :class="[{'colored' : route.path.includes('/categories')}]">{{ $t('categories.sub_category') }}</h3>
    <h3 v-if="route.path.includes('/products')" class="colored"> 
      <span>/</span>
      {{$t('categories.products')}}
    </h3>
  </div>
</template>

<script setup>
  // define route
  const route = useRoute()

  // define global store
  const globalStore = useGlobalStore()

  // define Api methods 
  const {
    getMethod , 
    getResult 
  } = useApiMethods()


  onMounted(()=>{
    getMethod('categories', '' , false, false)
  })
</script>

<style lang="scss" scoped>
    .breadcrumb{
      @include displayFlex($gap : 4px);
      h3{
        font-size: clamp(16px , 4vw , 24px);
        font-weight: 500;
        &.colored{
          color: $mainColor;
        }
      }
      .image{
        max-width: 30px;
      }
      &.filter_text{
        cursor: pointer;
      }
    }
</style>