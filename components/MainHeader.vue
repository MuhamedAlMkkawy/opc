<template>
  <div class="categories">
    <div class="header">
      <i class="pi pi-th-large"></i>
      <h5>{{$t("main_header.categories")}}</h5>
    </div>
    <ul>
      <li v-for="category in props?.categories" :key="category?.id">
        <NuxtLink 
          @click="globalStore.storeProductInfo(category?.id , '')"
          :to="localeRoute('/categories/' + category?.id)">
          <div class="image">
            <img :src="category?.image" alt="image" loading="lazy">
          </div>
          <span>{{category?.name}}</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localeRoute('/categories')">
          {{$t('main_header.show_categories')}}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>  
  // define locale route
  const localeRoute = useLocaleRoute()

  // define global store
  const globalStore = useGlobalStore()

  // define props
  const props = defineProps({
    categories : {
      type : Object,
      default : null
    }
  })
</script>

<style lang="scss" scoped>
  .categories{
    max-width: 300px;
    width: 100%;
    flex-shrink: 0;
    @media (max-width : 991px){
      max-width: 240px;
    }
    .header{
      background: $thirdColor;
      color: #fff;
      @include displayFlex($justify:flex-start , $gap : 8px);
      padding: 5px 12px;
      margin-bottom: 10px;
      h5{
        font-size: clamp(18px , 4vw , 25px);
        font-weight: 400;
      }
    }
    ul{
      box-shadow: 4px 4px 4px 0px #0000000D;
      li{
        .image{
          width: 25px;
          height: 25px;
          border-radius: 50%;
          overflow: hidden;
        }
        a{
          padding: 12px 10px;
          @include displayFlex($justify:flex-start , $gap : 5px);
          font-size: clamp(16px , 4vw , 20px);
          font-weight: 400;
          color: $textColor;
          width: 100%;
          height: 100%;
          position: relative;
          &::after{
            content: '';
            position: absolute;
            inset-inline-start: 0;
            top: 0;
            width: 0;
            height: 100%;
            z-index: -1;
            background: $thirdColor;
            transition: 0.2s;
          }
          &::before{
            content: '';
            position: absolute;
            inset-inline-end: 0;
            top: 0;
            width: 0;
            height: 100%;
            z-index: -1;
            background: $thirdColor;
            transition: 0.2s;
          }
          &:hover{
            color: #fff;
            &::after,
            &::before{
              width: 50%;
            }
          }
        }
        &:last-of-type{
          a{
            justify-content: center;
            color: $thirdColor;
            transition: 0s !important;
            &:hover{
              color: #fff !important;
            }
          }
        }
        &:not(:last-of-type){
          border-bottom: 1px solid #e4e4e4;
        }
      }
    }
    @media (max-width: 676px){
      max-width: 100%;
    }
  }
</style>