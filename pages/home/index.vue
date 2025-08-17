<template>
  <div>
    <div class="page home_page">
      <div class="container">
        <Searchbar />
        <!--################################ Brands Section ################################-->
        <section class="brands" v-if="getResult?.brands">
          <!-- :to="'products?category='+ brand.id" -->
          <div v-for="brand in getResult?.brands" @click="handleShowBrandFilterPopup(brand)" class="image">
            <img :src="brand.image" alt="image" loading="lazy">
          </div>
        </section>
        <!--################################ Main Header ################################-->
        <div class="main_header">
          <MainHeader v-if="getResult?.categories" :categories="getResult?.categories"/>
          <HomeSlider  v-if="getResult?.slider" :sliderImages = "getResult?.slider"/>
        </div>
        <!--################################ Offers Section ################################-->
        <div class="offers" v-if="getResult?.current_offers">
          <h3 class="title">{{$t('offers.title')}}</h3>
          <div class="content">
            <div 
              class="offer_item" 
              v-for="offer in getResult?.current_offers" 
              :key="offer.id" 
              @click="globalStore.handleShowImagePopup(offer.image)"
            >
              <img :src="offer.image" alt="image" loading="lazy">
            </div>
          </div>
        </div>
        <!--############################# Most Ordered Section #############################-->
        <section class="orders" v-if="getResult?.most_ordered_products">
          <h3 class="title">{{$t('most_products.title')}}</h3>
          <div class="content">
            <ProductItem 
              :products="getResult?.most_ordered_products"
            />
          </div>
        </section>
        <!--############################# Last Products Section #############################-->
        <section class="products" v-if="getResult?.last_viewed_products.length > 0">
          <h3 class="title">{{$t('last_products.title')}}</h3>
          <div class="content brands">
            <NuxtLink :to="'/products/' + product?.id" v-for="product in getResult?.last_viewed_products" :key="product?.id">
              <div class="image">
                <img :src="product.image" alt="image" loading="lazy">
              </div>
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
    <FloatBtns />
    <BrandFilterPopup 
      v-if="showBrandFilterPopup"
      @handleShowBrandFilterPopup="handleShowBrandFilterPopup"
    />
  </div>
</template>

<script setup>
  // define global Store
  const globalStore = useGlobalStore()

  // define auth store
  const authStore = useAuthStore()

  // handle api methods
  const {
    getMethod, 
    getResult,
    submitMethod
  } = useApiMethods()

  // handle brand filter popup
  const showBrandFilterPopup = ref(false)
  const handleShowBrandFilterPopup = (newBrand) => {
    globalStore.brand_data = newBrand
    showBrandFilterPopup.value = !showBrandFilterPopup.value
  }

  onMounted(()=>{
    getMethod('home' , '' , authStore?.userData ? true : false , false)
  })
</script>

<style lang="scss" scoped>
  .brands{
    // @include displayFlex($wrap : wrap);
    @include displayGrid(180px);
    &:not(:last-of-type){
      .image{
        flex-grow: 1;
      }
    }
    .image{
      box-shadow: 0 0px 4px rgb(0 0 0 / 11%);
      border-radius: 15px;
      overflow: hidden;
      height: 160px;
      background: #fff;
      padding: 15px;
      transition: 0.3s;
      cursor: pointer;
      img{
        object-fit: contain;
      }
      &:hover{
        box-shadow: 0 0px 10px rgba(0, 0, 0, 0.164);
        // filter: brightness(0.7);
      }
    }
  }
  .main_header{
    @include displayFlex($justify:space-between, $align : stretch);
    margin-block: 30px 0;
    transition: 1;
    @media (max-width: 676px){
      flex-direction: column;
      .categories{
        max-width: 100%;
      }
    }
  }
  .offers{
    .content{
      display: grid;
      gap: 10px;
      grid-auto-rows: 300px;
      .offer_item{
        position: relative;
        z-index: 3;
        width: 100%;
        min-height: 300px;
        cursor: pointer;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: #00000066;
          z-index: 2;
        }

        img{
          position: absolute;
          inset-inline-start: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
          object-fit: cover;
        }
        h4{
          font-size: clamp(18px, 4vw, 30px);
          font-weight: 500;
          color: #fff;
          position: absolute;
          left: 40%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          span{
            color: $secColor;
          }
        }
        &:nth-of-type(1){
          grid-area: 1 / 1 / span 1 / span 1;
        }
        &:nth-of-type(1){
          grid-area: 2 / 1 / span 1 / span 1;
        }
        &:nth-of-type(3){
          grid-area: 1 / 2 / span 2 / span 1;
        }
        &:nth-of-type(4){
          grid-area: 1 / 3 / span 2 / span 1;
        }
      }
      @media (max-width:767px){
        @include displayFlex($wrap : wrap);
        .offer_item{
          width: 300px;
          flex-grow: 1;
        }
      }
    }
  }
  .products{
    .content{
      a{
        display: block;
        // flex-grow: 1;
        max-width: 200px;
        .image{
          padding: 0;
          height: 200px !important;
          img{
            object-fit: cover;
          }
        }
      }
    }
  }
</style>