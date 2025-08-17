<template>
  <div class="page"> 
    <div class="container">
      <div class="store_status">
        <h1>
          {{
            getResult?.order_availablilty ?
            $t('check_store.available_order') :
            $t('check_store.unavailable_order')
          }}
        </h1>
        <div class="image">
          <img src="/assets/images/order_available.png" alt="image" loading="lazy" v-if="getResult?.order_availablilty">
          <img src="/assets/images/order_unavailable.png" alt="image" loading="lazy" v-else>
        </div>
      </div>
      <div class="content">
        <div class="order_item row_order_item" v-for="item in getResult?.items" :key="item.id">
          <div class="order_info">
            <div class="image">
              <img :src="item.image" alt="Order Item Image" loading="lazy" />
            </div>
            <div class="order_text">
              <h3>{{ item.product_name }}</h3>
              <div class="price">
                <h4 v-if="item?.price_after_discount > 0">{{item.price_after_discount}} {{item.currency}}</h4>
                <del v-if="item?.price_after_discount > 0">{{item.price}} {{item.currency}}</del>
                <h4 v-else>{{item.price}} {{item.currency}}</h4>
              </div>
              <ul class="themes">
                <li>{{ item.variant_name }}</li>
              </ul>
              <p>{{item.product_description}}</p>
            </div>
          </div>
          <div class="order_control">
            <button class="pi pi-trash" v-if="!item.is_available" @click="handleDeleteItem(item.id)"></button>
            <div v-if="item.is_available" class="status found">
              <i class="pi pi-check"></i>
              <span>{{$t('check_store.available')}}</span>
            </div>
            <div v-if="!item.is_available" class="status notfound">
              <i class="pi pi-times"></i>
              <span>{{$t('check_store.unavailable')}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <button class="main-btn reversed" @click="router.back()">
        {{$t('static_texts.go_back')}}
      </button> -->
      <FlexButtons 
        @handleSubmit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup>
  // define router
  const router = useRouter()

  // define local route
  const localeRoute = useLocaleRoute()

  // define global store
  const globalStore = useGlobalStore()

  // define api methods
  const {
    getMethod,
    getResult,
    submitMethod
  } = useApiMethods()

  // handle delete from cart
  const handleDeleteItem = (itemID) => {
    submitMethod(`carts/${itemID}/delete` , true , '' , 'DELETE' , '' , `check-branch-quantity-availability?branch_id=${globalStore.orderData.branch_id}`)
  }

  // define handleSubmit
  const handleSubmit = () => {
    router.push(localeRoute('/confirm_cart'))
  }

  onMounted(()=>{
    getMethod(`check-branch-quantity-availability?branch_id=${globalStore.orderData.branch_id}`, '' , true , false)
  })
</script>

<style lang="scss" scoped>
  .store_status{
    @include displayFlex();
    margin-bottom: 30px;
    h1{
      max-width: 400px;
      text-align: center;
      font-size: clamp(20px , 4vw , 40px);
      font-weight: 500;
      color: #333333;
      line-height: 1.2;
    }
    .image{
      max-width: 300px;
    }
    @media (max-width:567px){
      flex-wrap: wrap-reverse;
      .image{
        max-width: 150px;
      }
    }
  }
  .content{
    border: 2px solid #C9C9C9;
    border-radius: 8px;
    padding: clamp(15px , 4vw , 30px) clamp(8px , 4vw , 24px);
    margin-bottom: 30px;
    .order_item{
      &:not(:last-of-type){
        padding-bottom: 20px;
        border-bottom: 1px solid #C9C9C9;
      }
      .order_info{
        .image{
          width: 300px;
          height: 125px;
          border-radius: 4px;
          overflow: hidden;
        }
      }
    }
    .order_control{
      padding-block: 0 !important;
      .status{
        @include displayFlex($gap : 4px);
        i.pi{
          width: 20px;
          height: 20px;
          color: #fff;
          font-size: 10px;
        }
        &.found{
          color: #005B5C;
          i.pi{
            border-radius: 50%;
            background: #005B5C;
            @include displayFlex();
          }
        }
        &.notfound{
          color: $secColor;
          i.pi{
            border-radius: 4px;
            background: $secColor;
            @include displayFlex();
          }
        }
      }
    }
  }
  .main-btn{
    max-width: 607px;
    margin: 0 auto 30px;
    @include displayFlex();
  }
  .flex_buttons{
    max-width: 600px;
    margin: 0 auto;
  }
</style>